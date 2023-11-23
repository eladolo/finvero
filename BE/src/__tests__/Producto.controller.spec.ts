import { join } from 'path/posix';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductosController } from '../controllers/Productos.controller';
import { ProductosServicio } from '../services/Producto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { Productos } from '../entities/Producto.entity';
describe('ProductoController', () => {
    let productoController: ProductosController;
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
            controllers: [ProductosController],
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
                }
            ],
        }).compile();
    });
    
    describe('root', () => {
        it('should return productos object', async () => {
            const mockResponse: any = {
                status: () => {
                    return {
                        json: () => {
                            return {
                                productos: []
                            }
                        }
                    }
                }
            }
            productoController = app.get<ProductosController>(ProductosController);
            expect(await productoController.allProductos(mockResponse, {})).toMatchObject({productos: []});
        });

        it('should return productos object after add', async () => {
            const mockResponse: any = {
                status: () => {
                    return {
                        json: () => {
                            return {
                                productos: [{
                                    nombre: 'foo',
                                    precio: 45,
                                    cantidad: 12.34,
                                    uid: '1'
                                }]
                            }
                        }
                    }
                }
            }
            const mockRequest: any = {
                body: {
                    usuario: {}
                }
            }
            productoController = app.get<ProductosController>(ProductosController);
            expect(await productoController.createProducto(mockResponse, mockRequest)).toMatchObject({productos: [{
                nombre: 'foo',
                precio: 45,
                cantidad: 12.34,
                uid: '1'
            }]})
        });

        it('should return productos object after update', async () => {
            const mockResponse: any = {
                status: () => {
                    return {
                        json: () => {
                            return {
                                productos: []
                            }
                        }
                    }
                }
            }
            const mockRequest: any = {
                body: {
                    productos: {}
                }
            }
            productoController = app.get<ProductosController>(ProductosController);
            expect(await productoController.updateProducto(mockResponse, mockRequest)).toMatchObject({productos: []});
        });

        it('should return productos object after remove', async () => {
            const mockResponse: any = {
                status: () => {
                    return {
                        json: () => {
                            return {
                                productos: []
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
            productoController = app.get<ProductosController>(ProductosController);
            expect(await productoController.deleteProducto(mockResponse, mockRequest)).toMatchObject({productos: []});
        });
    });
});
