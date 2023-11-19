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
    async createUsuario(@Res() response: any, @Req() request: any): Promise<Usuarios[]> {
        const usuarios = await this.service.add(request.body.usuario);
        return response.status(HttpStatus.OK).json(usuarios);
    }

    @Patch()
    async updateUsuario(@Res() response: any, @Req() request: any): Promise<Usuarios[]> {
        await this.service.update(request.body.usuario);
        const usuarios = await this.service.findAll();
        return response.status(HttpStatus.OK).json(usuarios);
    }

    @Delete()
    async deleteUsuario(@Res() response: any, @Req() request: any): Promise<Usuarios[]> {
        await this.service.remove(request.body.id);
        const usuarios = await this.service.findAll();
        return response.status(HttpStatus.OK).json(usuarios);
    }
}
