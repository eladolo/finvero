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

    async add(user: Usuarios): Promise<Usuarios | null> {
        const foundUser = await this.repo.findOneBy({email: user.email})
        const foundUserName = await this.repo.findOneBy({nombre: user.nombre})
        if (!foundUser && !foundUserName) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(user.password, salt);
            const data = {
                nombre: user.nombre,
                email: user.email,
                password: hash,
                role: user?.role ? '1' : user.role.toString(),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const response = await this.repo.save(data);
            console.log(response);
            return response;

        }
        return null
    }

    async update(usuario: any): Promise<Usuarios | null> {
        if (usuario.oldpassword !== usuario.password) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(usuario.password, salt);
            usuario.password = hash
        }
        delete usuario.oldpassword
        const response = await this.repo.save(usuario);
        console.log(response);
        return response
    }

    async remove(id: number): Promise<void> {
        await this.repo.delete({ id });
    }
}
