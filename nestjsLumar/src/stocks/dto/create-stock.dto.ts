import { IsInt, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateStockDto {
  @IsInt()
  cantidad!: number;

  @IsUUID('4')
  tienda_id!: string;

  @IsUUID('4')
  producto_id!: string;
}
