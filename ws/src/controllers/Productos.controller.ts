import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    UploadedFiles,
    Put,
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

    @Post()
    async productosbyUser(@Res() response: any): Promise<Productos[]> {
        const productos = await this.service.findByUID(Req.arguments.uid);
        return response.status(HttpStatus.OK).json(productos);
    }
}
