import { join } from 'path/posix';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdenesController } from '../controllers/Ordenes.controller';
import { OrdenesServicio } from '../services/Orden.service';
import { ProductosServicio } from '../services/Producto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { Productos } from '../entities/Producto.entity';
import { Ordenes } from '../entities/Orden.entity';
describe('OrdenesController', () => {
    let ordenesController: OrdenesController;
    let app: TestingModule;
    beforeEach(async () => {
        app = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: process.env.JWT_SECRET,
                    signOptions: { expiresIn: '2h' },
                }),
                ServeStaticModule.forRoot({
                    rootPath: join(__dirname, '..', 'public'),
                }),
            ],
            controllers: [OrdenesController],
            providers: [
                ProductosServicio,
                {
                    provide: getRepositoryToken(Productos),
                    useFactory: () => ({
                        findOne: jest.fn((entity) => entity),
                        findOneBy: jest.fn(() => ({})),
                        save: jest.fn((entity) => entity),
                        findOneOrFail: jest.fn(() => ({})),
                        delete: jest.fn(() => null),
                        find: jest.fn((entities) => entities),
                    })
                },
                OrdenesServicio,
                {
                    provide: getRepositoryToken(Ordenes),
                    useFactory: () => ({
                        findOne: jest.fn((entity) => entity),
                        findOneBy: jest.fn(() => ({})),
                        save: jest.fn((entity) => entity),
                        update: jest.fn((entity) => entity),
                        findOneOrFail: jest.fn(() => ({})),
                        delete: jest.fn(() => null),
                        find: jest.fn((entities) => entities),
                    })
                }
            ],
        }).compile();
    });
    
    describe('root', () => {
        it('should return Ordenes object', async () => {
            const mockResponse: any = {
                status: () => {
                    return {
                        json: () => {
                            return {
                                ordenes: []
                            }
                        }
                    }
                }
            }
            ordenesController = app.get<OrdenesController>(OrdenesController);
            expect(await ordenesController.allOrdenes(mockResponse, {})).toMatchObject({ordenes: []});
        });

        it('should return Ordenes object after add', async () => {
            const mockResponse: any = {
                status: () => {
                    return {
                        json: () => {
                            return {
                                ordenes: [{
                                    nombre: 'foo',
                                    email: 'foo@foo.com',
                                    pasword: '123456',
                                    role: '1'
                                }]
                            }
                        }
                    }
                }
            }
            const mockRequest: any = {
                body: {
                    orden: {
                        productos: "[]"
                    }
                }
            }
            ordenesController = app.get<OrdenesController>(OrdenesController);
            expect(await ordenesController.createOrder(mockResponse, mockRequest)).toMatchObject({ordenes: [{
                nombre: 'foo',
                email: 'foo@foo.com',
                pasword: '123456',
                role: '1'
            }]})
        });

        it('should return Ordenes object after update', async () => {
            const mockResponse: any = {
                status: () => {
                    return {
                        json: () => {
                            return {
                                Ordenes: []
                            }
                        }
                    }
                }
            }
            const mockRequest: any = {
                body: {
                    orden: {
                        productos: "[]"
                    }
                }
            }
            ordenesController = app.get<OrdenesController>(OrdenesController);
            expect(await ordenesController.updateOrder(mockResponse, mockRequest)).toMatchObject({Ordenes: []});
        });

        it('should return Ordenes object after remove', async () => {
            const mockResponse: any = {
                status: () => {
                    return {
                        json: () => {
                            return {
                                Ordenes: []
                            }
                        }
                    }
                }
            }
            const mockRequest: any = {
                body: {
                    id: -1
                }
            }
            ordenesController = app.get<OrdenesController>(OrdenesController);
            expect(await ordenesController.deleteOrder(mockResponse, mockRequest)).toMatchObject({Ordenes: []});
        });
    });
});
