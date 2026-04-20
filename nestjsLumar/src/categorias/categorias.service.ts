import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class CategoriasService {
  private readonly logger = new Logger('CategoriasService');

  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      const categoria = this.categoriaRepository.create(createCategoriaDto);
      await this.categoriaRepository.save(categoria);

      return categoria;
    } catch (error) {}

    this.handleDBExceptions(error);
  }

  async findAll() {
    const categorias = await this.categoriaRepository.find();

    return categorias;
  }

  async findOne(id: string) {
    const categoria = await this.categoriaRepository.findOneBy({ id });

    if (!categoria) {
      throw new NotFoundException('Categoria no encontrada');
    }

    return categoria;
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.categoriaRepository.preload({
      id: id,
      ...updateCategoriaDto,
    });

    if (!categoria) {
      throw new NotFoundException('Categoria no encontrada');
    }

    return await this.categoriaRepository.save(categoria);
  }

  async remove(id: string) {
    const categoria = await this.findOne(id);

    this.categoriaRepository.remove(categoria);

    return categoria;
  }

  //Funcion para error de dato repetido

  private handleDBExceptions(error: any) {
    //console.log(error);
    if (error.code === '23505') {
      const detail: string = error.detail;

      const field = detail.match(/\((.*?)\)/)?.[1]; // obtiene el nombre del campo

      throw new BadRequestException(
        `El campo '${field}' ya existe en la base de datos`,
      );
    }
    this.logger.error(error);
    //console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
