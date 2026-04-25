import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { UsersModule } from '../users/users.module';
import { TiendasModule } from '../tiendas/tiendas.module';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  controllers: [VentasController],
  providers: [VentasService],
  imports: [
    TypeOrmModule.forFeature([Venta]),
    UsersModule,
    TiendasModule,
    ClientesModule,
  ],
  exports: [VentasService],
})
export class VentasModule {}
