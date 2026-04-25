import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/lumar');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Lumar API')
    .setDescription('Documentacion oficial del backend de Lumar')
    .setVersion('1.0')
    .addTag('Auth', 'Autenticacion y autorizacion')
    .addTag('Users', 'Gestion de usuarios')
    .addTag('Clientes', 'Gestion de clientes')
    .addTag('Productos', 'Gestion de productos')
    .addTag('Categorias', 'Gestion de categorias')
    .addTag('Tiendas', 'Gestion de tiendas')
    .addTag('Stocks', 'Gestion de inventario')
    .addTag('Ventas', 'Gestion de ventas')
    .addTag('DetalleVentas', 'Gestion de detalles de ventas')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingresa el token JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/lumar/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
