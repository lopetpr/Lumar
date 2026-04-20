import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  private readonly logger = new Logger('ClientesService');

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    try {
      const cliente = this.clienteRepository.create(createClienteDto);

      await this.clienteRepository.save(cliente);

      return cliente;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return this.clienteRepository.find();
  }

  async findOne(id: string) {
    const cliente = await this.clienteRepository.findOneBy({ id });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.preload({
      id: id,
      ...updateClienteDto,
    });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    return cliente;
  }

  async remove(id: string) {
    const cliente = await this.findOne(id);

    await this.clienteRepository.remove(cliente);

    return cliente;
  }

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
