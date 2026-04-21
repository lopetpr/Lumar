import { Producto } from '../../productos/entities/producto.entity';
import { Tienda } from '../../tiendas/entities/tienda.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('int', {
    default: 0,
  })
  cantidad!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  //relaciones
  @ManyToOne(() => Tienda, (tienda) => tienda.stock, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tienda_id' })
  tienda!: Tienda;

  @ManyToOne(() => Producto, (producto) => producto.stock, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'producto_id' })
  producto!: Producto;
}
