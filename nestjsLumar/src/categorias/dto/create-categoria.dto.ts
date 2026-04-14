import { IsString } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  categoria!: string;
}
