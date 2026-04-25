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
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Stocks')
@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un registro de stock' })
  @ApiBody({ type: CreateStockDto })
  @ApiCreatedResponse({ description: 'Stock creado correctamente' })
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar stocks' })
  @ApiOkResponse({ description: 'Listado de stocks' })
  findAll() {
    return this.stocksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener stock por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID del stock' })
  @ApiOkResponse({ description: 'Stock encontrado' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.stocksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar stock por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID del stock' })
  @ApiBody({ type: UpdateStockDto })
  @ApiOkResponse({ description: 'Stock actualizado correctamente' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return this.stocksService.update(id, updateStockDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar stock por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID del stock' })
  @ApiOkResponse({ description: 'Stock eliminado correctamente' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.stocksService.remove(id);
  }
}
