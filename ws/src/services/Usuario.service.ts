import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/Usuario.entity';

@Injectable()
export class UsuarioServicio {
  constructor(
    @InjectRepository(Usuario)
    private repo: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Usuario | null> {
    return this.repo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete({ id });
  }
}
