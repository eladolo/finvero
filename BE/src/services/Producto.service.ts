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
        const data = {
            ...producto,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await this.repo.save(data);
    }

    async update(producto: Productos): Promise<void> {
        const data = {
            ...producto,
            updatedAt: new Date()
        }
        await this.repo.save(data);
    }

    async remove(id: number): Promise<void> {
        await this.repo.delete({ id });
    }
}
