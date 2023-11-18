import {
    Controller,
    Delete,
    Get,
    HttpStatus,
    Post,
    Patch,
    Req,
    Res,
} from '@nestjs/common';
import { ProductosServicio } from '../services/Producto.service';
import { Productos } from '../entities/Producto.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('/api/v1/productos')
export class ProductosController {
    constructor(
        private readonly service: ProductosServicio,
        private jwt: JwtService,
    ) {}

    @Get()
    async allProductos(@Res() response: any): Promise<Productos[]> {
        const productos = await this.service.findByUID(Req.arguments.uid);
        return response.status(HttpStatus.OK).json(productos);
    }

    @Get('/user')
    async productosbyUser(@Res() response: any): Promise<Productos[]> {
        const productos = await this.service.findByUID(Req.arguments.uid);
        return response.status(HttpStatus.OK).json(productos);
    }

    @Post()
    async createOrder(@Res() response: any): Promise<Productos[]> {
        const productos = await this.service.add(Req.arguments.producto);
        return response.status(HttpStatus.OK).json(productos);
    }

    @Patch()
    async updateOrder(@Res() response: any): Promise<Productos[]> {
        const productos = await this.service.update(Req.arguments.producto);
        return response.status(HttpStatus.OK).json(productos);
    }

    @Delete()
    async deleteOrder(@Res() response: any): Promise<Productos[]> {
        const productos = await this.service.remove(Req.arguments.id);
        return response.status(HttpStatus.OK).json(productos);
    }
}
