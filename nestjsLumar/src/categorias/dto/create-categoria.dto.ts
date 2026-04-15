import { IsString, IsUUID } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  categoria!: string;
}
