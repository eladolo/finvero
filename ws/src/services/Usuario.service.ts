import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

    async remove(id: number): Promise<void> {
        await this.repo.delete({ id });
    }

    async signin(user: Usuarios, jwt: JwtService): Promise<any> {
        const foundUser = await this.findOneByEmail(user.email);
        if (foundUser) {
            const { password } = foundUser;
            if (await bcrypt.compare(user.password, password)) {
                const payload = { email: user.email };
                return {
                    token: jwt.sign(payload),
                };
            }
            return new HttpException(
                'Incorrect username or password',
                HttpStatus.UNAUTHORIZED,
            );
        }
        return new HttpException(
            'Incorrect username or password',
            HttpStatus.UNAUTHORIZED,
        );
    }

    async signup(user: Usuarios): Promise<Usuarios> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        const reqBody = {
            nombre: user.nombre,
            email: user.email,
            password: hash,
            role: user?.role ? '1' : user.role.toString(),
        };
        const newUser = await this.repo.create(reqBody);
        return newUser;
    }
}
