import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { Repository } from 'typeorm';
import { VentasService } from '../ventas/ventas.service';
import { ProductosService } from '../productos/productos.service';

@Injectable()
export class DetalleVentasService {
  private readonly logger = new Logger('DetalleVentasService');

  constructor(
    @InjectRepository(DetalleVenta)
    private readonly detalleVentaRepository: Repository<DetalleVenta>,

    private readonly ventasService: VentasService,

    private readonly productosService: ProductosService,
  ) {}

  async create(createDetalleVentaDto: CreateDetalleVentaDto) {
    try {
      const { venta_id, producto_id, ...detalleData } = createDetalleVentaDto;

      const venta = await this.ventasService.findOne(venta_id);
      const producto = await this.productosService.findOne(producto_id);

      const detalle = this.detalleVentaRepository.create({
        ...detalleData,
        venta,
        producto,
      });

      await this.detalleVentaRepository.save(detalle);

      return detalle;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.detalleVentaRepository.find({
      relations: {
        venta: true,
        producto: true,
      },
    });
  }

  async findOne(id: string) {
    const detalle = await this.detalleVentaRepository.findOne({
      where: { id },
      relations: {
        venta: true,
        producto: true,
      },
    });

    if (!detalle) {
      throw new NotFoundException('Detalle de venta no encontrado');
    }

    return detalle;
  }

  async update(id: string, updateDetalleVentaDto: UpdateDetalleVentaDto) {
    const detalle = await this.findOne(id);

    const { venta_id, producto_id, ...detalleData } = updateDetalleVentaDto;

    if (venta_id) {
      detalle.venta = await this.ventasService.findOne(venta_id);
    }

    if (producto_id) {
      detalle.producto = await this.productosService.findOne(producto_id);
    }

    Object.assign(detalle, detalleData);

    try {
      return await this.detalleVentaRepository.save(detalle);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const detalle = await this.findOne(id);

    await this.detalleVentaRepository.remove(detalle);

    return detalle;
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
