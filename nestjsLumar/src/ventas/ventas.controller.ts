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
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Ventas')
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una venta' })
  @ApiBody({ type: CreateVentaDto })
  @ApiCreatedResponse({ description: 'Venta registrada correctamente' })
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.create(createVentaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar ventas' })
  @ApiOkResponse({ description: 'Listado de ventas' })
  findAll() {
    return this.ventasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una venta por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID de la venta' })
  @ApiOkResponse({ description: 'Venta encontrada' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ventasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una venta por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID de la venta' })
  @ApiBody({ type: UpdateVentaDto })
  @ApiOkResponse({ description: 'Venta actualizada correctamente' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVentaDto: UpdateVentaDto,
  ) {
    return this.ventasService.update(id, updateVentaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una venta por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID de la venta' })
  @ApiOkResponse({ description: 'Venta eliminada correctamente' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ventasService.remove(id);
  }
}
