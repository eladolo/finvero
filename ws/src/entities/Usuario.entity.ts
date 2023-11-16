import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Usuario {
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
}