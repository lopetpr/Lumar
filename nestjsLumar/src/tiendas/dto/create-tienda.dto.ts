import { IsString } from 'class-validator';

export class CreateTiendaDto {
  @IsString()
  tienda!: string;

  @IsString()
  direccion!: string;
}
