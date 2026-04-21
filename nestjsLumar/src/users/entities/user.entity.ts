import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text', {
    unique: true,
  })
  user_name!: string;

  @Column('text')
  nombre!: string;

  @Column('text', {
    select: false,
  })
  password!: string;

  //1 es admi y 2 es empleado
  @Column('int')
  rol!: number;

  @Column('bool', {
    default: true,
  })
  estado!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
