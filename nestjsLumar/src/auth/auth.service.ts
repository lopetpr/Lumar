import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './interfaces/jwt-payload.interface';

import * as bcrypt from 'bcrypt';

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
      select: { id: true, user_name: true, password: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // TODO falta esta funcionalidad

    return { ...user, token: await this.getJwtToken({ id: user.id }) };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.signAsync(payload);
    return token;
  }
}
