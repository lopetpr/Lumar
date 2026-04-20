import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
import { TiendasModule } from './tiendas/tiendas.module';
import { StocksModule } from './stocks/stocks.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      //esto es para que cargue automaticamente las entidades
      autoLoadEntities: true,
      //solo para desarrollo
      synchronize: true,
    }),
    CategoriasModule,
    ProductosModule,
    TiendasModule,
    StocksModule,
    ClientesModule,
  ],
})
export class AppModule {}
