import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path/posix';
import { ProductosServicio } from '../services/Producto.service';
import { ProductosController } from '../controllers/Productos.controller';
import { Productos } from '../entities/Producto.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Productos]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '2h' },
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
    ],
    providers: [ProductosServicio],
    controllers: [ProductosController],
})
export class ProductosModule {}
