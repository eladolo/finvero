import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({
    name: 'Ordenes',
    schema: 'Ordenes',
})
export class Ordenes {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    uid: number;

    @Column()
    nombre: string;

    @Column('decimal', { precision: 6, scale: 2})
    total: number;

    @Column()
    productos: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}