import { IsInt, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDetalleVentaDto {
  @ApiProperty({
    description: 'Cantidad de unidades vendidas',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  cantidad!: number;

  @ApiProperty({
    description: 'ID de la venta a la que pertenece este detalle',
    format: 'uuid',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID('4')
  venta_id!: string;

  @ApiProperty({
    description: 'ID del producto vendido',
    format: 'uuid',
    example: 'f71ab24e-2d2a-43fe-8e8d-97853769f7f8',
  })
  @IsUUID('4')
  producto_id!: string;
}
