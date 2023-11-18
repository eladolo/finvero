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
import { OrdenesServicio } from '../services/Orden.service';
import { Ordenes } from '../entities/Orden.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('/api/v1/ordenes')
export class OrdenesController {
    constructor(
        private readonly service: OrdenesServicio,
        private jwt: JwtService,
    ) {}

    @Get()
    async allOrdenes(@Res() response: any): Promise<Ordenes[]> {
        const productos = await this.service.findByUID(Req.arguments.uid);
        return response.status(HttpStatus.OK).json(productos);
    }

    @Get('/user')
    async ordenesbyUser(@Res() response: any): Promise<Ordenes[]> {
        const ordenes = await this.service.findByUID(Req.arguments.uid);
        return response.status(HttpStatus.OK).json(ordenes);
    }

    @Post()
    async createOrder(@Res() response: any): Promise<Ordenes[]> {
        const ordenes = await this.service.add(Req.arguments.orden);
        return response.status(HttpStatus.OK).json(ordenes);
    }

    @Patch()
    async updateOrder(@Res() response: any): Promise<Ordenes[]> {
        const ordenes = await this.service.update(Req.arguments.orden);
        return response.status(HttpStatus.OK).json(ordenes);
    }

    @Delete()
    async deleteOrder(@Res() response: any): Promise<Ordenes[]> {
        const ordenes = await this.service.remove(Req.arguments.id);
        return response.status(HttpStatus.OK).json(ordenes);
    }
}
