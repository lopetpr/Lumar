import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  user_name!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @IsInt()
  @IsPositive()
  @IsIn([1, 2])
  rol!: number;
}
