import { Cliente } from '../../clientes/entities/cliente.entity';
import { Tienda } from '../../tiendas/entities/tienda.entity';
import { User } from '../../users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DetalleVenta } from '../../detalle-ventas/entities/detalle-venta.entity';

@Entity()
export class Venta {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn()
  timestamp!: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Tienda, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tienda_id' })
  tienda!: Tienda;

  @ManyToOne(() => Cliente, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cliente_id' })
  cliente!: Cliente;

  @OneToMany(() => DetalleVenta, (detalle) => detalle.venta)
  detalles!: DetalleVenta[];
}
