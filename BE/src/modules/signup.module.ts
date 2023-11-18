import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path/posix';
import { SignupServicio } from '../services/signup.service';
import { SignupController } from '../controllers/signup.controller';
import { Usuarios } from '../entities/Usuario.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuarios]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '2h' },
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
    ],
    providers: [SignupServicio],
    controllers: [SignupController],
})
export class SignupModule {}
