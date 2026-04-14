import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userInf } = createUserDto;

      const hashPassword = await bcrypt.hash(password, 10);

      const user = this.userRepository.create({
        ...userInf,
        password: hashPassword,
      });
      await this.userRepository.save(user);

      const { password: _, ...userSave } = user;
      return userSave;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users.map(({ password, ...user }) => user);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const { password, ...userInf } = user;
    return userInf;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException('Usuario para actualizar no encontrado');
    }

    await this.userRepository.save(user);

    const { password, ...userUpdate } = user;

    return userUpdate;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    await this.userRepository.remove(user);

    const { password, ...userRemove } = user;
    return userRemove;
  }

  //Funcion para error de dato repetido

  private handleDBExceptions(error: any) {
    //console.log(error);
    if (error.code === '23505') {
      const detail: string = error.detail;

      const field = detail.match(/\((.*?)\)/)?.[1]; // obtiene el nombre del campo

      throw new BadRequestException(
        `El campo '${field}' ya existe en la base de datos`,
      );
    }
    this.logger.error(error);
    //console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
