import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { FilterProductoDto } from './dto/filter-producto.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        producto: { type: 'string' },
        descripcion: { type: 'string' },
        tipo: { type: 'string', enum: ['30ml', '70ml', '100ml'] },
        genero: { type: 'string', enum: ['hombre', 'mujer'] },
        precio_compra: { type: 'number' },
        precio_venta: { type: 'number' },
        categoria_id: { type: 'string', format: 'uuid' },
        imagen: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiCreatedResponse({ description: 'Producto creado correctamente' })
  @UseInterceptors(FileInterceptor('imagen', { limits: { fileSize: 5 * 1024 * 1024 } }))
  create(
    @Body() createProductoDto: CreateProductoDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.productosService.create(createProductoDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Listar productos con filtros' })
  @ApiQuery({ name: 'genero', required: false, enum: ['hombre', 'mujer'] })
  @ApiQuery({ name: 'tipo', required: false, enum: ['30ml', '70ml', '100ml'] })
  @ApiQuery({ name: 'categoria_id', required: false, type: String, description: 'UUID de categoría' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Cantidad de resultados (default: 10)' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Desplazamiento (default: 0)' })
  @ApiOkResponse({ description: 'Listado de productos' })
  findAll(@Query() filterDto: FilterProductoDto) {
    return this.productosService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID del producto' })
  @ApiOkResponse({ description: 'Producto encontrado' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID del producto' })
  @ApiBody({ type: UpdateProductoDto })
  @ApiOkResponse({ description: 'Producto actualizado correctamente' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Patch(':id/imagen')
  @ApiOperation({ summary: 'Subir imagen de un producto' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID del producto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { imagen: { type: 'string', format: 'binary' } },
    },
  })
  @ApiOkResponse({ description: 'Imagen subida correctamente' })
  @UseInterceptors(FileInterceptor('imagen', { limits: { fileSize: 5 * 1024 * 1024 } }))
  uploadImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productosService.uploadImage(id, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiParam({ name: 'id', format: 'uuid', description: 'ID del producto' })
  @ApiOkResponse({ description: 'Producto eliminado correctamente' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.remove(id);
  }
}
