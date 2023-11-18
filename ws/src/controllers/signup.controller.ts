import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common';
import { SignupServicio } from '../services/signup.service';
import { Usuarios } from '../entities/Usuario.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('/api/v1/login')
export class SignupController {
    constructor(
        private readonly service: SignupServicio,
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
}
