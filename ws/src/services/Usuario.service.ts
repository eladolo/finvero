import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuarios } from '../entities/Usuario.entity';

@Injectable()
export class UsuarioServicio {
    constructor(
        @InjectRepository(Usuarios)
        private repo: Repository<Usuarios>,
    ) {}

    findAll(): Promise<Usuarios[]> {
        return this.repo.find();
    }

    findOne(id: number): Promise<Usuarios | null> {
        return this.repo.findOneBy({ id });
    }

    findOneByEmail(email: string): Promise<Usuarios | null> {
        return this.repo.findOneBy({ email });
    }

    async add(user: Usuarios): Promise<void> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        const data = {
            nombre: user.nombre,
            email: user.email,
            password: hash,
            role: user?.role ? '1' : user.role.toString(),
        };
        await this.repo.create(data);
    }

    async update(usuario: Usuarios): Promise<void> {
        await this.repo.update(usuario.id, usuario);
    }

    async remove(id: number): Promise<void> {
        await this.repo.delete({ id });
    }
}
