import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path/posix';
import { UsuarioServicio } from '../services/Usuario.service';
import { UsuarioController } from '../controllers/Usuario.controller';
import { Usuarios } from '../entities/Usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios]),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '2h' },
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }),
  ],
  providers: [UsuarioServicio],
  controllers: [UsuarioController],
})
export class UsuarioModule {}