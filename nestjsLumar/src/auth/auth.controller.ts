import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { Public } from './decorators/public.decorator';
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
  @Public()
  @ApiOperation({ summary: 'Iniciar sesion de usuario' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Login exitoso, retorna usuario y token JWT' })
  @ApiUnauthorizedResponse({ description: 'Credenciales invalidas' })
  create(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('prueba')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Endpoint de prueba protegido por JWT' })
  @ApiOkResponse({ description: 'Acceso autorizado' })
  @ApiUnauthorizedResponse({ description: 'Token no valido o ausente' })
  testing() {
    return {
      ok: 'hola',
    };
  }
}
