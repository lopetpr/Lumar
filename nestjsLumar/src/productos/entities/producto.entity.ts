import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Stock } from 'src/stocks/entities/stock.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  producto!: string;

  @Column('text', {
    nullable: true,
  })
  descripcion?: string;

  @Column('text')
  tipo!: string;

  //Hombre o mujer
  @Column('text')
  genero!: string;

  @Column('text', {
    nullable: true,
  })
  imagen?: string;

  @Column('numeric', {
    default: 0,
  })
  precio_compra!: number;

  @Column('numeric', {
    default: 0,
  })
  precio_venta!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  //Relaciones con otros modulos

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'categoria_id' })
  categoria_id!: Categoria;

  @OneToMany(() => Stock, (stock) => stock.producto_id)
  stock!: Stock[];
}
