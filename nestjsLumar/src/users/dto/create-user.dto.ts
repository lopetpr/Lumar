import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
  })
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Perez',
  })
  @IsNotEmpty()
  @IsString()
  apellido!: string;

  @ApiProperty({
    description: 'Correo electronico del usuario',
    example: 'admin@lumar.com',
  })
  @IsNotEmpty()
  @IsEmail()
  correo!: string;

  @ApiProperty({
    description: 'Contrasena del usuario',
    example: 'Admin123*',
    minLength: 6,
    maxLength: 50,
  })
  @IsString()
  @MinLength(6, { message: 'El password debe ser minimo de 6 caracteres' })
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener una mayuscula, una miniscula y un numero',
  })
  password!: string;

  @ApiProperty({
    description: 'Rol del usuario (1: admin, 2: vendedor)',
    example: 1,
    enum: [1, 2],
  })
  @IsInt()
  @IsPositive()
  @IsIn([1, 2])
  rol!: number;

  @ApiPropertyOptional({
    description: 'Telefono del usuario',
    example: 59170000000,
  })
  @IsOptional()
  telefono?: number;
}
