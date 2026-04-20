import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @MinLength(3)
  nombre!: string;

  @IsString()
  @IsEmail()
  email!: string;
}
