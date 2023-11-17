import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
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

    @Post()
    async ordenesbyUser(@Res() response: any): Promise<Ordenes[]> {
        const ordenes = await this.service.findByUID(Req.arguments.uid);
        return response.status(HttpStatus.OK).json(ordenes);
    }
}
