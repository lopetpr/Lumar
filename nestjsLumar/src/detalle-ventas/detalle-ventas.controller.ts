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
import { DetalleVentasService } from './detalle-ventas.service';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('DetalleVentas')
@Controller('detalle-ventas')
export class DetalleVentasController {
  constructor(private readonly detalleVentasService: DetalleVentasService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un detalle de venta' })
  @ApiBody({ type: CreateDetalleVentaDto })
  @ApiCreatedResponse({ description: 'Detalle de venta registrado correctamente' })
  create(@Body() createDetalleVentaDto: CreateDetalleVentaDto) {
    return this.detalleVentasService.create(createDetalleVentaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar detalles de ventas' })
  @ApiOkResponse({ description: 'Listado de detalles de ventas' })
  findAll() {
    return this.detalleVentasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un detalle de venta por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID del detalle de venta' })
  @ApiOkResponse({ description: 'Detalle de venta encontrado' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.detalleVentasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un detalle de venta por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID del detalle de venta' })
  @ApiBody({ type: UpdateDetalleVentaDto })
  @ApiOkResponse({ description: 'Detalle de venta actualizado correctamente' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDetalleVentaDto: UpdateDetalleVentaDto,
  ) {
    return this.detalleVentasService.update(id, updateDetalleVentaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un detalle de venta por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID del detalle de venta' })
  @ApiOkResponse({ description: 'Detalle de venta eliminado correctamente' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.detalleVentasService.remove(id);
  }
}
