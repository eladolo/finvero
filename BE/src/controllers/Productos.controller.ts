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
    async allProductos(@Res() response: any, @Req() request: any): Promise<Productos[]> {
        const productos = await this.service.findByUID(request.body.id);
        return response.status(HttpStatus.OK).json(productos);
    }

    @Get('/user')
    async productosbyUser(@Res() response: any, @Req() request: any): Promise<Productos[]> {
        const productos = await this.service.findByUID(request.body.id);
        return response.status(HttpStatus.OK).json(productos);
    }

    @Post()
    async createOrder(@Res() response: any, @Req() request: any): Promise<Productos[]> {
        const productos = await this.service.add(request.body.producto);
        return response.status(HttpStatus.OK).json(productos);
    }

    @Patch()
    async updateOrder(@Res() response: any, @Req() request: any): Promise<Productos[]> {
        const productos = await this.service.update(request.body.producto);
        return response.status(HttpStatus.OK).json(productos);
    }

    @Delete()
    async deleteOrder(@Res() response: any, @Req() request: any): Promise<Productos[]> {
        const productos = await this.service.remove(request.body.id);
        return response.status(HttpStatus.OK).json(productos);
    }
}
