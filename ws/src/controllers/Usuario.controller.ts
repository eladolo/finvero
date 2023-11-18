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

    @Post('/signup')
    async Signup(@Res() response: any, @Body() user: Usuarios) {
        const newUSer = await this.service.signup(user);
        return response.status(HttpStatus.CREATED).json({
            newUSer,
        });
    }
    @Post('/signin')
    async SignIn(@Res() response: any, @Body() user: Usuarios) {
        const token = await this.service.signin(user, this.jwt);
        return response.status(HttpStatus.OK).json(1234);
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
