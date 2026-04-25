import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({ description: 'Nombre de la categoria', example: 'Camisas' })
  @IsString()
  categoria!: string;
}
