import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({
    name: 'Ordenes',
    schema: 'Ordenes',
})
export class Ordenes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uid: number;

    @Column()
    total: number;

    @Column()
    products: string;
}