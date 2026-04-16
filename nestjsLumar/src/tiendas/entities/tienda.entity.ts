import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tienda {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  tienda!: string;

  @Column('text')
  direccion!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
