import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({
    name: 'Usuarios',
    schema: 'Usuarios',
})
export class Usuarios {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    @Column()
    email: string;

    @Column()
    nombre: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
