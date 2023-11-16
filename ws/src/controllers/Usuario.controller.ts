import { Controller, Get } from '@nestjs/common';
import { UsuarioServicio } from '../services/Usuario.service';
import { Usuario } from '../entities/Usuario.entity';

@Controller()
export class UsuarioController {
  constructor(private readonly service: UsuarioServicio) {}

  @Get()
  async usuarios(): Promise<Usuario[]> {
    return await this.service.findAll();
  }
}
