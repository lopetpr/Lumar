import { IsIn, IsNumber, IsOptional, IsPositive, IsUUID, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FilterProductoDto {
  @ApiPropertyOptional({ description: 'Filtrar por género', enum: ['hombre', 'mujer'] })
  @IsOptional()
  @IsIn(['hombre', 'mujer'])
  genero?: string;

  @ApiPropertyOptional({ description: 'Filtrar por tamaño', enum: ['30ml', '70ml', '100ml'] })
  @IsOptional()
  @IsIn(['30ml', '70ml', '100ml'])
  tipo?: string;

  @ApiPropertyOptional({ description: 'Filtrar por categoría', format: 'uuid' })
  @IsOptional()
  @IsUUID('4')
  categoria_id?: string;

  @ApiPropertyOptional({ description: 'Cantidad de resultados', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  limit?: number;

  @ApiPropertyOptional({ description: 'Desplazamiento para paginación', default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;
}
