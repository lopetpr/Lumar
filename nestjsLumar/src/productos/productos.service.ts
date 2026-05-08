import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CategoriasService } from '../categorias/categorias.service';
import { FilterProductoDto } from './dto/filter-producto.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class ProductosService {
  private readonly logger = new Logger('ProductosService');

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    private readonly categoriasService: CategoriasService,
    private readonly filesService: FilesService,
  ) {}

  async create(createProductoDto: CreateProductoDto, file?: Express.Multer.File) {
    try {
      const { categoria_id, imagen, ...productoData } = createProductoDto;

      const categoria = await this.categoriasService.findOne(categoria_id);

      let imageUrl: string | undefined;
      if (file) {
        imageUrl = await this.filesService.uploadImage(file);
      }

      const producto = this.productoRepository.create({
        ...productoData,
        imagen: imageUrl,
        categoria,
      });

      return await this.productoRepository.save(producto);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(filterDto: FilterProductoDto) {
    const { genero, tipo, categoria_id, limit = 10, offset = 0 } = filterDto;
    const where: FindOptionsWhere<Producto> = {};

    if (genero) where.genero = genero;
    if (tipo) where.tipo = tipo;
    if (categoria_id) where.categoria = { id: categoria_id };

    return await this.productoRepository.find({
      where,
      relations: { categoria: true },
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: {
        categoria: true,
      },
    });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const producto = await this.findOne(id);
    const { categoria_id, ...productoData } = updateProductoDto;

    if (categoria_id) {
      const categoria = await this.categoriasService.findOne(categoria_id);
      producto.categoria = categoria;
    }

    Object.assign(producto, productoData);

    try {
      return await this.productoRepository.save(producto);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
    return producto;
  }

  async uploadImage(id: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(
        'No se envió ninguna imagen. Usa multipart/form-data con el campo "imagen".',
      );
    }

    this.logger.debug(
      `uploadImage file received: name=${file.originalname} size=${file.size} type=${file.mimetype}`,
    );

    const producto = await this.findOne(id);
    const imageUrl = await this.filesService.uploadImage(file);
    this.logger.debug(`uploadImage uploaded: url=${imageUrl}`);

    producto.imagen = imageUrl;
    return await this.productoRepository.save(producto);
  }

  private handleDBExceptions(error: any): never {
    if (error instanceof NotFoundException) {
      throw error;
    }

    if (error?.code === '23505') {
      const detail: string = error.detail || 'Dato duplicado';
      throw new BadRequestException(detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
