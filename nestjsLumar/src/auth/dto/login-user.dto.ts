import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'admin01',
    minLength: 4,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  user_name!: string;

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
}
