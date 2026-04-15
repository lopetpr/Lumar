import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  producto!: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  tipo!: string;

  @IsString()
  @IsIn(['hombre', 'mujer'])
  genero!: string;

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsPositive()
  @IsNumber()
  precio_compra!: number;

  @IsNumber()
  @IsPositive()
  precio_venta!: number;

  @IsUUID('4')
  categoria_id!: string;
}
