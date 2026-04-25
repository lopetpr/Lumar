import { Module } from '@nestjs/common';
import { DetalleVentasService } from './detalle-ventas.service';
import { DetalleVentasController } from './detalle-ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { VentasModule } from '../ventas/ventas.module';
import { ProductosModule } from '../productos/productos.module';

@Module({
  controllers: [DetalleVentasController],
  providers: [DetalleVentasService],
  imports: [
    TypeOrmModule.forFeature([DetalleVenta]),
    VentasModule,
    ProductosModule,
  ],
  exports: [DetalleVentasService],
})
export class DetalleVentasModule {}
