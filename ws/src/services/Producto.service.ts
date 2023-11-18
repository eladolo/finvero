import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productos } from '../entities/Producto.entity';

@Injectable()
export class ProductosServicio {
    constructor(
        @InjectRepository(Productos)
        private repo: Repository<Productos>,
    ) {}

    findAll(): Promise<Productos[]> {
        return this.repo.find();
    }

    findOne(id: number): Promise<Productos | null> {
        return this.repo.findOneBy({ id });
    }

    findByUID(uid: number): Promise<Productos[] | []> {
        return this.repo.findBy({ uid });
    }

    async add(producto: Productos): Promise<void> {
        await this.repo.create(producto);
    }

    async update(producto: Productos): Promise<void> {
        await this.repo.update(producto.id, producto);
    }

    async remove(id: number): Promise<void> {
        await this.repo.delete({ id });
    }
}
