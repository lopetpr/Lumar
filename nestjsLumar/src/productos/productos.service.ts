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
import { Repository } from 'typeorm';
import { CategoriasService } from '../categorias/categorias.service';

@Injectable()
export class ProductosService {
  private readonly logger = new Logger('ProductosService');

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    //Se usa para usar el service
    private readonly categoriasService: CategoriasService,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const { categoria_id, ...productoData } = createProductoDto;

      const categoria = await this.categoriasService.findOne(categoria_id);

      const producto = this.productoRepository.create({
        ...productoData,
        categoria: categoria,
      });

      return await this.productoRepository.save(producto);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.productoRepository.find({
      relations: {
        categoria: true,
      },
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
