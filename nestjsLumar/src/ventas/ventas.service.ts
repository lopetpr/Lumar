import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { TiendasService } from '../tiendas/tiendas.service';
import { ClientesService } from '../clientes/clientes.service';

@Injectable()
export class VentasService {
  private readonly logger = new Logger('VentasService');

  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,

    private readonly usersService: UsersService,

    private readonly tiendasService: TiendasService,

    private readonly clientesService: ClientesService,
  ) {}

  async create(createVentaDto: CreateVentaDto) {
    try {
      const { user_id, tienda_id, cliente_id } = createVentaDto;

      const user = await this.usersService.findOne(user_id);
      const tienda = await this.tiendasService.findOne(tienda_id);
      const cliente = await this.clientesService.findOne(cliente_id);

      const venta = this.ventaRepository.create({ user, tienda, cliente });

      await this.ventaRepository.save(venta);

      return venta;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.ventaRepository.find({
      relations: {
        user: true,
        tienda: true,
        cliente: true,
        detalles: { producto: true },
      },
    });
  }

  async findOne(id: string) {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: {
        user: true,
        tienda: true,
        cliente: true,
        detalles: { producto: true },
      },
    });

    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }

    return venta;
  }

  async update(id: string, updateVentaDto: UpdateVentaDto) {
    const venta = await this.findOne(id);

    const { user_id, tienda_id, cliente_id } = updateVentaDto;

    if (user_id) {
      venta.user = await this.usersService.findOne(user_id);
    }

    if (tienda_id) {
      venta.tienda = await this.tiendasService.findOne(tienda_id);
    }

    if (cliente_id) {
      venta.cliente = await this.clientesService.findOne(cliente_id);
    }

    try {
      return await this.ventaRepository.save(venta);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const venta = await this.findOne(id);

    await this.ventaRepository.remove(venta);

    return venta;
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
