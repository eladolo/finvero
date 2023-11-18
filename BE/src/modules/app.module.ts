import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { UsuarioModule } from './Usuario.module';
import { UsuarioController } from '../controllers/Usuario.controller';
import { UsuarioServicio } from '../services/Usuario.service';
import { Usuarios } from '../entities/Usuario.entity';
import { ProductosModule } from './Productos.module';
import { ProductosController } from '../controllers/Productos.controller';
import { ProductosServicio } from '../services/Producto.service';
import { Productos } from '../entities/Producto.entity';
import { OrdenesModule } from './Ordenes.module';
import { OrdenesController } from '../controllers/Ordenes.controller';
import { OrdenesServicio } from '../services/Orden.service';
import { Ordenes } from '../entities/Orden.entity';
import { SignupModule } from './signup.module';
import { SignupController } from '../controllers/signup.controller';
import { SignupServicio } from '../services/signup.service';
@Module({
    imports: [
        Repository,
        UsuarioModule,
        ProductosModule,
        OrdenesModule,
        SignupModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: false,
            autoLoadEntities: true,
        }),
        TypeOrmModule.forFeature([Usuarios, Productos, Ordenes]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '2h' },
        }),
    ],
    controllers: [AppController, SignupController],
    providers: [AppService, UsuarioServicio, ProductosServicio, OrdenesServicio, SignupServicio],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(isAuthenticated)
            .exclude({ path: '/', method: RequestMethod.GET })
            .forRoutes(UsuarioController, ProductosController, OrdenesController);
    }
}
