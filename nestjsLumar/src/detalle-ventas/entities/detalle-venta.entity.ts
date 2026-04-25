import { Producto } from '../../productos/entities/producto.entity';
import { Venta } from '../../ventas/entities/venta.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DetalleVenta {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('int', { default: 1 })
  cantidad!: number;

  @ManyToOne(() => Venta, (venta) => venta.detalles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'venta_id' })
  venta!: Venta;

  @ManyToOne(() => Producto, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'producto_id' })
  producto!: Producto;
}
