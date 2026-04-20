import { Module } from '@nestjs/common';
import { TiendasService } from './tiendas.service';
import { TiendasController } from './tiendas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tienda } from './entities/tienda.entity';

@Module({
  controllers: [TiendasController],
  providers: [TiendasService],

  imports: [TypeOrmModule.forFeature([Tienda])],
  exports: [TiendasService],
})
export class TiendasModule {}
