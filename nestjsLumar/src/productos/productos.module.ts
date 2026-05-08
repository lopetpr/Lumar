import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { CategoriasModule } from '../categorias/categorias.module';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [TypeOrmModule.forFeature([Producto, Categoria]), CategoriasModule, FilesModule],
  exports: [ProductosService],
})
export class ProductosModule {}
