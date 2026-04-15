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
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Injectable()
export class ProductosService {
  private readonly logger = new Logger('ProductosService');

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const categoria = await this.categoriaRepository.findOneBy({
      id: createProductoDto.categoria_id,
    });

    if (!categoria) {
      throw new NotFoundException('Categoria no encontrada');
    }

    try {
      const producto = this.productoRepository.create({
        ...createProductoDto,
        categoria_id: categoria,
      });

      await this.productoRepository.save(producto);
      return producto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return this.productoRepository.find({
      relations: { categoria_id: true },
    });
  }

  async findOne(id: string) {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: { categoria_id: true },
    });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const { categoria_id, ...restData } = updateProductoDto;

    const producto = await this.productoRepository.findOneBy({ id });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    try {
      Object.assign(producto, restData);

      if (categoria_id) {
        const categoria = await this.categoriaRepository.findOneBy({
          id: categoria_id,
        });

        if (!categoria) {
          throw new NotFoundException('Categoria no encontrada');
        }

        producto.categoria_id = categoria;
      }

      await this.productoRepository.save(producto);

      return this.findOne(id);
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
    if (error?.code === '23505') {
      throw new BadRequestException('Registro duplicado');
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
