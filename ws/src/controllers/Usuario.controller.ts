import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    UploadedFiles,
    Put,
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

    @Get()
    async usuarios(@Res() response: any): Promise<Usuarios[]> {
        const usuarios = await this.service.findAll();
        return response.status(HttpStatus.OK).json(usuarios);
    }
}
