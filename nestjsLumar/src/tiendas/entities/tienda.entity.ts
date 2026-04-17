import { Stock } from 'src/stocks/entities/stock.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  //Relaciones

  @OneToMany(() => Stock, (stock) => stock.tienda_id)
  stock!: Stock[];
}
