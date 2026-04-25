import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVentaDto {
  @ApiProperty({
    description: 'ID del usuario que registra la venta',
    format: 'uuid',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID('4')
  user_id!: string;

  @ApiProperty({
    description: 'ID de la tienda donde se realiza la venta',
    format: 'uuid',
    example: '3d92863e-4e03-4682-b452-8d1246ea3df6',
  })
  @IsUUID('4')
  tienda_id!: string;

  @ApiProperty({
    description: 'ID del cliente asociado a la venta',
    format: 'uuid',
    example: 'f71ab24e-2d2a-43fe-8e8d-97853769f7f8',
  })
  @IsUUID('4')
  cliente_id!: string;
}
