import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tienda } from './entities/tienda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiendasService {
  private readonly logger = new Logger('TiendasService');
  constructor(
    @InjectRepository(Tienda)
    private readonly tiendaRepository: Repository<Tienda>,
  ) {}

  async create(createTiendaDto: CreateTiendaDto) {
    try {
      const tienda = this.tiendaRepository.create(createTiendaDto);
      await this.tiendaRepository.save(tienda);

      return tienda;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const tiendas = this.tiendaRepository.find();

    return tiendas;
  }

  async findOne(id: string) {
    const tienda = await this.tiendaRepository.findOneBy({ id });

    if (!tienda) {
      throw new NotFoundException('Tienda no encontrada');
    }

    return tienda;
  }

  async update(id: string, updateTiendaDto: UpdateTiendaDto) {
    const tienda = await this.tiendaRepository.preload({
      id: id,
      ...updateTiendaDto,
    });

    if (!tienda) {
      throw new NotFoundException('Tienda no encontrada');
    }
    return tienda;
  }

  async remove(id: string) {
    const tienda = await this.findOne(id);

    await this.tiendaRepository.remove(tienda);

    return tienda;
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
