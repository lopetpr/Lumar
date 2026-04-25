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
import { TiendasService } from './tiendas.service';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tiendas')
@Controller('tiendas')
export class TiendasController {
  constructor(private readonly tiendasService: TiendasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una tienda' })
  @ApiBody({ type: CreateTiendaDto })
  @ApiCreatedResponse({ description: 'Tienda creada correctamente' })
  create(@Body() createTiendaDto: CreateTiendaDto) {
    return this.tiendasService.create(createTiendaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tiendas' })
  @ApiOkResponse({ description: 'Listado de tiendas' })
  findAll() {
    return this.tiendasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tienda por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID de la tienda' })
  @ApiOkResponse({ description: 'Tienda encontrada' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tiendasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tienda por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID de la tienda' })
  @ApiBody({ type: UpdateTiendaDto })
  @ApiOkResponse({ description: 'Tienda actualizada correctamente' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTiendaDto: UpdateTiendaDto,
  ) {
    return this.tiendasService.update(id, updateTiendaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tienda por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID de la tienda' })
  @ApiOkResponse({ description: 'Tienda eliminada correctamente' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tiendasService.remove(id);
  }
}
