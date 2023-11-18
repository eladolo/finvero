import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Patch,
    Delete,
    Req,
    Res,
} from '@nestjs/common';
import { UsuarioServicio } from '../services/Usuario.service';
import { Usuarios } from '../entities/Usuario.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('/api/v1/usuarios')
export class UsuarioController {
    constructor(
        private readonly service: UsuarioServicio,
        private jwt: JwtService,
    ) {}

    @Get()
    async usuarios(@Res() response: any): Promise<Usuarios[]> {
        const usuarios = await this.service.findAll();
        return response.status(HttpStatus.OK).json(usuarios);
    }

    @Post()
    async createUsuario(@Res() response: any): Promise<Usuarios[]> {
        const usuarios = await this.service.add(Req.arguments.orden);
        return response.status(HttpStatus.OK).json(usuarios);
    }

    @Patch()
    async updateUsuario(@Res() response: any): Promise<Usuarios[]> {
        const usuarios = await this.service.update(Req.arguments.orden);
        return response.status(HttpStatus.OK).json(usuarios);
    }

    @Delete()
    async deleteUsuario(@Res() response: any): Promise<Usuarios[]> {
        const usuarios = await this.service.remove(Req.arguments.id);
        return response.status(HttpStatus.OK).json(usuarios);
    }
}
