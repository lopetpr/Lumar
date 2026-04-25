import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTiendaDto {
  @ApiProperty({ description: 'Nombre de la tienda', example: 'Tienda Centro' })
  @IsString()
  tienda!: string;

  @ApiProperty({
    description: 'Direccion de la tienda',
    example: 'Av. Principal 123, Ciudad',
  })
  @IsString()
  direccion!: string;
}
