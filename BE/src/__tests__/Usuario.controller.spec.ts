import { join } from 'path/posix';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from '../controllers/Usuario.controller';
import { UsuarioServicio } from '../services/Usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { Usuarios } from '../entities/Usuario.entity';
import { Repository } from 'typeorm';
describe('UsuarioController', () => {
    let usuarioController: UsuarioController;
    let app: TestingModule;
    let userRepo: Repository<Usuarios>;
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
            controllers: [UsuarioController],
            providers: [
                UsuarioServicio,
                {
                    provide: getRepositoryToken(Usuarios),
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
        userRepo = app.get<Repository<Usuarios>>(getRepositoryToken(Usuarios))
    });
    
    describe('root', () => {
        it('should return usuarios object', async () => {
            const mockResponse: any = {
                status: () => {
                    return {
                        json: () => {
                            return {
                                usuarios: []
                            }
                        }
                    }
                }
            }
            usuarioController = app.get<UsuarioController>(UsuarioController);
            expect(await usuarioController.usuarios(mockResponse)).toMatchObject({usuarios: []});
        });

        it('should return usuarios object after add', async () => {
            const mockResponse: any = {
                status: () => {
                    return {
                        json: () => {
                            return {
                                usuarios: [{
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
                    usuario: {}
                }
            }
            usuarioController = app.get<UsuarioController>(UsuarioController);
            expect(await usuarioController.createUsuario(mockResponse, mockRequest)).toMatchObject({usuarios: [{
                nombre: 'foo',
                email: 'foo@foo.com',
                pasword: '123456',
                role: '1'
            }]})
        });

        it('should return usuarios object after update', async () => {
            const mockResponse: any = {
                status: () => {
                    return {
                        json: () => {
                            return {
                                usuarios: []
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
            usuarioController = app.get<UsuarioController>(UsuarioController);
            expect(await usuarioController.updateUsuario(mockResponse, mockRequest)).toMatchObject({usuarios: []});
        });

        it('should return usuarios object after remove', async () => {
            const mockResponse: any = {
                status: () => {
                    return {
                        json: () => {
                            return {
                                usuarios: []
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
            usuarioController = app.get<UsuarioController>(UsuarioController);
            expect(await usuarioController.deleteUsuario(mockResponse, mockRequest)).toMatchObject({usuarios: []});
        });
    });
});
