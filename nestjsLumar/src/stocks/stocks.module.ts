import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { ProductosModule } from '../productos/productos.module';
import { TiendasModule } from '../tiendas/tiendas.module';

@Module({
  controllers: [StocksController],
  providers: [StocksService],
  imports: [TypeOrmModule.forFeature([Stock]), ProductosModule, TiendasModule],
  exports: [StocksService],
})
export class StocksModule {}
