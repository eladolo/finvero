import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuarios } from '../entities/Usuario.entity';

@Injectable()
export class SignupServicio {
    constructor(
        @InjectRepository(Usuarios)
        private repo: Repository<Usuarios>,
    ) {}

    findOneByEmail(email: string): Promise<Usuarios | null> {
        return this.repo.findOneBy({ email });
    }

    findOneByName(nombre: string): Promise<Usuarios | null> {
        return this.repo.findOneBy({ nombre });
    }

    async signin(user: Usuarios, jwt: JwtService): Promise<any> {
        let foundUser: any = false;
        if (user.email !== '') {
            foundUser = await this.findOneByEmail(user.email);
        } else if (user.nombre !== '') {
            foundUser = await this.findOneByName(user.nombre);
        }
        if (foundUser) {
            const { password } = foundUser;
            if (await bcrypt.compare(user.password, password)) {
                const payload = { email: user.email, uid: foundUser.id, role: foundUser.role };
                return {
                    token: jwt.sign(payload),
                    uid: foundUser.id,
                    role: foundUser.role,
                    email: foundUser.email,
                    nombre: foundUser.nombre
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
