import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { UsuarioModule } from '../modules/Usuario.module';
import { UsuarioController } from '../controllers/Usuario.controller';
import { UsuarioServicio } from '../services/Usuario.service';
import { Usuarios } from '../entities/Usuario.entity';
@Module({
    imports: [
        Repository,
        UsuarioModule,
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
        TypeOrmModule.forFeature([Usuarios]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '2h' },
        }),
    ],
    controllers: [AppController],
    providers: [AppService, UsuarioServicio],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(isAuthenticated)
            .exclude({ path: '/', method: RequestMethod.GET })
            .forRoutes(UsuarioController);
    }
}
