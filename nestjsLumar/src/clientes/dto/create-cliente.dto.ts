import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Maria Gomez',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  nombre!: string;

  @ApiProperty({
    description: 'Correo electronico del cliente',
    example: 'maria.gomez@correo.com',
  })
  @IsString()
  @IsEmail()
  email!: string;
}
