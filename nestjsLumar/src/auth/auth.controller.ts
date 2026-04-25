import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesion de usuario' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Login exitoso, retorna usuario y token JWT' })
  @ApiUnauthorizedResponse({ description: 'Credenciales invalidas' })
  create(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('prueba')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Endpoint de prueba protegido por JWT' })
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'Acceso autorizado' })
  @ApiUnauthorizedResponse({ description: 'Token no valido o ausente' })
  testing() {
    return {
      ok: 'hola',
    };
  }
}
