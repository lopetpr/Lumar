# Estructura del Backend — NestJS Lumar

Guía de referencia para replicar este mismo patrón en otros proyectos.

---

## Stack

| Tecnología | Uso |
|---|---|
| NestJS | Framework principal |
| TypeORM | ORM |
| PostgreSQL | Base de datos |
| Passport + JWT | Autenticación |
| class-validator | Validación de DTOs |
| bcrypt | Hash de contraseñas |
| Swagger | Documentación automática |

---

## Configuración global (`main.ts`)

```typescript
app.setGlobalPrefix('api/lumar');

app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,           // ignora campos no declarados en el DTO
    forbidNonWhitelisted: true, // lanza error si llegan campos extra
  }),
);
```

**Swagger** disponible en `GET /api/lumar/docs`.

**Variables de entorno** via `ConfigModule.forRoot({ isGlobal: true })` en `app.module.ts` — disponibles en todo el proyecto con `ConfigService`.

Variables necesarias:
```
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
JWT_SECRET
```

---

## Estructura de carpetas por módulo

Cada módulo sigue esta estructura idéntica:

```
src/
└── nombre-modulo/
    ├── dto/
    │   ├── create-nombre-modulo.dto.ts
    │   └── update-nombre-modulo.dto.ts
    ├── entities/
    │   └── nombre-modulo.entity.ts
    ├── nombre-modulo.controller.ts
    ├── nombre-modulo.service.ts
    └── nombre-modulo.module.ts
```

Módulos actuales: `auth`, `users`, `clientes`, `productos`, `categorias`, `tiendas`, `stocks`, `ventas`, `detalle-ventas`.

---

## Patrón CRUD

### 1. Entity (`entities/producto.entity.ts`)

```typescript
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne,
         OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  producto!: string;

  @Column('text', { nullable: true })
  descripcion?: string;

  @Column('numeric', { default: 0 })
  precio_venta!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  // Relación ManyToOne
  @ManyToOne(() => Categoria, (categoria) => categoria.productos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoria_id' })
  categoria!: Categoria;

  // Relación OneToMany
  @OneToMany(() => Stock, (stock) => stock.producto)
  stock!: Stock[];
}
```

- ID siempre UUID v4.
- `@CreateDateColumn` y `@UpdateDateColumn` en todas las entidades.
- Relaciones: `@ManyToOne` con `@JoinColumn` para la FK, `@OneToMany` para el lado inverso.

### 2. DTOs

**Create DTO** (`dto/create-producto.dto.ts`):
```typescript
import { IsIn, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Camisa Oxford' })
  @IsString()
  producto!: string;

  @ApiPropertyOptional({ description: 'Descripcion', example: 'Manga larga' })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ description: 'Genero', example: 'hombre', enum: ['hombre', 'mujer'] })
  @IsString()
  @IsIn(['hombre', 'mujer'])
  genero!: string;

  @ApiProperty({ description: 'Precio de venta', example: 69.9 })
  @IsNumber()
  @IsPositive()
  precio_venta!: number;

  @ApiProperty({ description: 'ID categoria', format: 'uuid' })
  @IsUUID('4')
  categoria_id!: string;
}
```

**Update DTO** (`dto/update-producto.dto.ts`):
```typescript
import { PartialType } from '@nestjs/swagger';
import { CreateProductoDto } from './create-producto.dto';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {}
```

`PartialType` de `@nestjs/swagger` (no de `@nestjs/mapped-types`) — hace todos los campos opcionales y hereda los decoradores Swagger.

### 3. Service (`productos.service.ts`)

```typescript
@Injectable()
export class ProductosService {
  private readonly logger = new Logger('ProductosService');

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly categoriasService: CategoriasService, // servicio externo inyectado
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const { categoria_id, ...productoData } = createProductoDto;
      const categoria = await this.categoriasService.findOne(categoria_id);

      const producto = this.productoRepository.create({
        ...productoData,
        categoria,
      });
      return await this.productoRepository.save(producto);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.productoRepository.find({
      relations: { categoria: true }, // cargar relaciones explícitamente
    });
  }

  async findOne(id: string) {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: { categoria: true },
    });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const producto = await this.findOne(id);
    const { categoria_id, ...productoData } = updateProductoDto;

    if (categoria_id) {
      producto.categoria = await this.categoriasService.findOne(categoria_id);
    }
    Object.assign(producto, productoData);

    try {
      return await this.productoRepository.save(producto);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
    return producto;
  }

  private handleDBExceptions(error: any): never {
    if (error instanceof NotFoundException) throw error;

    if (error?.code === '23505') {
      const detail: string = error.detail || 'Dato duplicado';
      throw new BadRequestException(detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
```

**Reglas del service:**
- `Logger` con el nombre del service.
- `handleDBExceptions()` privado en todo service — captura código PG `23505` (unique constraint) y relanza como `BadRequestException`.
- `findOne()` siempre lanza `NotFoundException` si no existe — usado por `update` y `remove`.
- Update: `findOne()` + `Object.assign()` + `save()`.

### 4. Controller (`productos.controller.ts`)

```typescript
@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiBody({ type: CreateProductoDto })
  @ApiCreatedResponse({ description: 'Producto creado correctamente' })
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar productos' })
  @ApiOkResponse({ description: 'Listado de productos' })
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Producto encontrado' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiBody({ type: UpdateProductoDto })
  @ApiOkResponse({ description: 'Producto actualizado correctamente' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Producto eliminado correctamente' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.remove(id);
  }
}
```

- `@ApiTags('Nombre')` en cada controller — agrupa en Swagger.
- `ParseUUIDPipe` en todos los params de tipo UUID.
- Decoradores Swagger en cada endpoint: `@ApiOperation`, `@ApiBody`, `@ApiOkResponse`/`@ApiCreatedResponse`, `@ApiParam`.

### 5. Module (`productos.module.ts`)

```typescript
@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [
    TypeOrmModule.forFeature([Producto, Categoria]),
    CategoriasModule, // importar módulo externo para usar su service
  ],
  exports: [ProductosService], // exportar si otros módulos necesitan este service
})
export class ProductosModule {}
```

---

## Autenticación JWT

### Flujo completo

```
POST /api/lumar/auth/login
  → recibe { user_name, password }
  → busca usuario en DB (select password incluido)
  → bcrypt.compareSync(password, user.password)
  → genera JWT con payload { id: user.id }
  → retorna { id, user_name, token }

Endpoints protegidos:
  → Header: Authorization: Bearer <token>
  → JwtStrategy.validate() busca usuario por id del payload
  → verifica user.estado === true
  → adjunta user al request
```

### Auth Service (`auth/auth.service.ts`)

```typescript
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { user_name, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { user_name },
      select: { id: true, user_name: true, password: true }, // password solo aquí
    });

    if (!user) throw new UnauthorizedException('Credenciales incorrectas');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales incorrectas');

    return { ...user, token: await this.getJwtToken({ id: user.id }) };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload);
  }
}
```

### JWT Strategy (`auth/strategies/jwt.strategy.ts`)

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: payload.id } });

    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    if (!user.estado) throw new UnauthorizedException('Usuario inactivo');

    return user; // se adjunta al request como req.user
  }
}
```

### Auth Module (`auth/auth.module.ts`)

```typescript
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '2d' },
      }),
    }),
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule], // exportar todo
})
export class AuthModule {}
```

### Proteger un endpoint

```typescript
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Get('ruta-protegida')
@UseGuards(AuthGuard())
@ApiBearerAuth('access-token') // para el candado en Swagger
metodo() {
  return 'solo usuarios autenticados';
}
```

Para que funcione en un módulo externo, ese módulo debe importar `AuthModule`:

```typescript
@Module({
  imports: [AuthModule, ...],
})
export class OtroModule {}
```

### Decorator `@GetUser`

Disponible en `auth/decorators/get-user.decorator.ts`:

```typescript
export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;
  if (!user) throw new InternalServerErrorException('Usuario no encontrado (request)');
  return user;
});
```

Uso:
```typescript
@Get('perfil')
@UseGuards(AuthGuard())
getPerfil(@GetUser() user: User) {
  return user;
}
```

---

## Manejo de usuarios y contraseñas

```typescript
// Crear usuario — hashear antes de guardar
const hashPassword = bcrypt.hashSync(password, 10);
const user = this.userRepository.create({ ...userInf, password: hashPassword });

// Update — si viene password nueva, hashear también
if (updateUserDto.password) {
  updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
}
const user = await this.userRepository.preload({ id, ...updateUserDto });

// Nunca retornar password
const { password, ...userSave } = user;
return userSave;
```

**User entity — campo password:**
```typescript
@Column('text', { select: false }) // excluido por defecto en queries
password!: string;
```

**Roles:**
- `1` = admin
- `2` = empleado

**Estado:** `boolean`, default `true`. `JwtStrategy` bloquea usuarios con `estado: false`.

---

## Convenciones generales

| Regla | Detalle |
|---|---|
| IDs | UUID v4 siempre (`@PrimaryGeneratedColumn('uuid')`) |
| Errores DB | Siempre pasar por `handleDBExceptions()` en el service |
| Relaciones en queries | Cargar con `relations: { entidad: true }` |
| Update pattern | `findOne()` → mutate → `save()` (o `preload()` para updates simples) |
| DTO Update | `PartialType(CreateDto)` de `@nestjs/swagger` |
| Swagger | `@ApiTags`, `@ApiOperation`, `@ApiBody`, `@ApiParam` en todos los endpoints |
| Validación | `class-validator` en DTOs, `ParseUUIDPipe` en params UUID |
| Logger | `new Logger('NombreService')` en cada service |
