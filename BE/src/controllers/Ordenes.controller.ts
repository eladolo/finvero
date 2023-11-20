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
    async allOrdenes(@Res() response: any, @Req() request: any): Promise<Ordenes[]> {
        const productos = await this.service.findAll();
        return response.status(HttpStatus.OK).json(productos);
    }

    @Get('/user')
    async ordenesbyUser(@Res() response: any, @Req() request: any): Promise<Ordenes[]> {
        const ordenes = await this.service.findByUID(request.body.id);
        return response.status(HttpStatus.OK).json(ordenes);
    }

    @Post()
    async createOrder(@Res() response: any, @Req() request: any): Promise<Ordenes[]> {
        const ordenes = await this.service.add(request.body.orden);
        return response.status(HttpStatus.OK).json(ordenes);
    }

    @Patch()
    async updateOrder(@Res() response: any, @Req() request: any): Promise<Ordenes[]> {
        const ordenes = await this.service.update(request.body.orden);
        return response.status(HttpStatus.OK).json(ordenes);
    }

    @Delete()
    async deleteOrder(@Res() response: any, @Req() request: any): Promise<Ordenes[]> {
        const ordenes = await this.service.remove(request.body.id);
        return response.status(HttpStatus.OK).json(ordenes);
    }
}
