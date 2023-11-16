import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioServicio } from '../services/Usuario.service';
import { UsuarioController } from '../controllers/Usuario.controller';
import { Usuario } from '../entities/Usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuarioServicio],
  controllers: [UsuarioController],
})
export class UsersModule {}