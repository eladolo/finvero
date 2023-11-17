import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ordenes } from '../entities/Orden.entity';

@Injectable()
export class OrdenesServicio {
    constructor(
        @InjectRepository(Ordenes)
        private repo: Repository<Ordenes>,
    ) {}

    findAll(): Promise<Ordenes[]> {
        return this.repo.find();
    }

    findOne(id: number): Promise<Ordenes | null> {
        return this.repo.findOneBy({ id });
    }

    findByUID(uid: number): Promise<Ordenes[] | []> {
        return this.repo.findBy({ uid });
    }

    async remove(id: number): Promise<void> {
        await this.repo.delete({ id });
    }
}
