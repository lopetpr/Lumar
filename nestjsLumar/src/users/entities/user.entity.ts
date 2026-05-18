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

  @Column('text')
  nombre!: string;

  @Column('text')
  apellido!: string;

  @Column('text', {
    unique: true,
    nullable: true,
  })
  correo!: string;

  @Column('text', {
    select: false,
  })
  password!: string;

  @Column('int')
  rol!: number;

  @Column('bigint', {
    nullable: true,
  })
  telefono!: number;

  @Column('bool', {
    default: true,
  })
  estado!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
