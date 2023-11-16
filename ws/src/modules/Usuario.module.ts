import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioServicio } from '../services/Usuario.service';
import { UsuarioController } from '../controllers/Usuario.controller';
import { Usuarios } from '../entities/Usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  providers: [UsuarioServicio],
  controllers: [UsuarioController],
})
export class UsuarioModule {}