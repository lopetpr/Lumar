import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Camisa Oxford' })
  @IsString()
  producto!: string;

  @ApiPropertyOptional({
    description: 'Descripcion del producto',
    example: 'Camisa manga larga color azul',
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ description: 'Tipo de producto', example: 'ropa' })
  @IsString()
  tipo!: string;

  @ApiProperty({
    description: 'Genero al que va dirigido el producto',
    example: 'hombre',
    enum: ['hombre', 'mujer'],
  })
  @IsString()
  @IsIn(['hombre', 'mujer'])
  genero!: string;

  @ApiPropertyOptional({
    description: 'URL o nombre de archivo de la imagen',
    example: 'https://cdn.lumar.com/camisa-oxford.jpg',
  })
  @IsString()
  @IsOptional()
  imagen?: string;

  @ApiProperty({ description: 'Precio de compra', example: 45.5 })
  @IsPositive()
  @IsNumber()
  precio_compra!: number;

  @ApiProperty({ description: 'Precio de venta', example: 69.9 })
  @IsNumber()
  @IsPositive()
  precio_venta!: number;

  @ApiProperty({
    description: 'ID de la categoria asociada',
    format: 'uuid',
    example: '16e1b0de-5d22-4c11-8b31-6650130ccb27',
  })
  @IsUUID('4')
  categoria_id!: string;
}
