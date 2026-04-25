import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una categoria' })
  @ApiBody({ type: CreateCategoriaDto })
  @ApiCreatedResponse({ description: 'Categoria creada correctamente' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar categorias' })
  @ApiOkResponse({ description: 'Listado de categorias' })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoria por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID de la categoria' })
  @ApiOkResponse({ description: 'Categoria encontrada' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoria por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID de la categoria' })
  @ApiBody({ type: UpdateCategoriaDto })
  @ApiOkResponse({ description: 'Categoria actualizada correctamente' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoria por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID de la categoria' })
  @ApiOkResponse({ description: 'Categoria eliminada correctamente' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriasService.remove(id);
  }
}
