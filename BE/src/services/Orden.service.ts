import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ordenes } from '../entities/Orden.entity';
import { ProductosServicio } from './Producto.service';

@Injectable()
export class OrdenesServicio {
    constructor(
        @InjectRepository(Ordenes)
        private repo: Repository<Ordenes>,
        private readonly productoService: ProductosServicio
    ) {}

    findAll(): Promise<Ordenes[]> {
        return this.repo.find();
    }

    findOne(id: number): Promise<Ordenes | null> {
        return this.repo.findOneBy({ id });
    }

    findByUID(uid: number): Promise<Ordenes[] | []> {
        return this.repo.findBy({ uid });
    }

    async updateOrdenProductos(productos: any): Promise<void> {
        // console.log(productos)
        productos.forEach(async (producto: any) => {
            const dbProducto: any = await this.productoService.findOne(producto.id);
            const newAmount: any = dbProducto.cantidad - producto.addToCart;
            
            await this.productoService.update({
                ...dbProducto,
                cantidad: newAmount
            })

        })
    }

    async add(orden: Ordenes): Promise<void> {
        const data = {
            ...orden,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await this.repo.save(data);
        await this.updateOrdenProductos(JSON.parse(data.productos));
    }

    async update(orden: Ordenes): Promise<void> {
        await this.repo.update(orden.id, orden);
    }

    async remove(id: number): Promise<void> {
        await this.repo.delete({ id });
    }
}
