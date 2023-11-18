import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path/posix';
import { OrdenesServicio } from '../services/Orden.service';
import { OrdenesController } from '../controllers/Ordenes.controller';
import { Ordenes } from '../entities/Orden.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ordenes]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '2h' },
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
    ],
    providers: [OrdenesServicio],
    controllers: [OrdenesController],
})
export class OrdenesModule {}
