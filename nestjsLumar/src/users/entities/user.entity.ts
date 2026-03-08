import {Column, Entity, Migration, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text', {
        select: false,
    })
    password: string;

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP',
    })
    timestamp: Date;
}
