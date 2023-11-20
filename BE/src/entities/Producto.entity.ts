import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({
    name: 'Productos',
    schema: 'Productos',
})
export class Productos {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    uid: number;

    @Column()
    nombre: string;

    @Column('decimal', { precision: 6, scale: 2})
    precio: number;

    @Column()
    cantidad: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}