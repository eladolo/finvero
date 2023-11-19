import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({
    name: 'Productos',
    schema: 'Productos',
})
export class Productos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uid: number;

    @Column()
    nombre: string;

    @Column()
    precio: number;

    @Column()
    cantidad: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}