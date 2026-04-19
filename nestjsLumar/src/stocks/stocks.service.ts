import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { TiendasService } from 'src/tiendas/tiendas.service';
import { ProductosService } from 'src/productos/productos.service';

@Injectable()
export class StocksService {
  private readonly logger = new Logger('StocksService');

  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,

    private readonly tiendasService: TiendasService,

    private readonly productosService: ProductosService,
  ) {}
  async create(createStockDto: CreateStockDto) {
    try {
      const { tienda_id, producto_id, ...stockData } = createStockDto;
      const tienda = await this.tiendasService.findOne(tienda_id);
      const producto = await this.productosService.findOne(producto_id);

      const stock = this.stockRepository.create({
        ...stockData,
        tienda,
        producto,
      });

      await this.stockRepository.save(stock);

      return stock;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.stockRepository.find({
      relations: {
        tienda: true,
        producto: true,
      },
    });
  }

  async findOne(id: string) {
    const stock = await this.stockRepository.findOne({
      where: { id },
      relations: {
        tienda: true,
        producto: true,
      },
    });

    if (!stock) {
      throw new NotFoundException('No se encontro stock');
    }

    return stock;
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    const stock = await this.findOne(id);

    const { tienda_id, producto_id, ...stockData } = updateStockDto;

    if (tienda_id) {
      const tienda = await this.tiendasService.findOne(tienda_id);
      stock.tienda = tienda;
    }

    if (producto_id) {
      const producto = await this.productosService.findOne(producto_id);
      stock.producto = producto;
    }

    Object.assign(stock, stockData);

    try {
      return await this.stockRepository.save(stock);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const stock = await this.findOne(id);

    await this.stockRepository.remove(stock);
    return stock;
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
