import { join } from 'path/posix';
import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from '../controllers/signup.controller';
import { SignupServicio } from '../services/signup.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { Usuarios } from '../entities/Usuario.entity';
describe('SignupController', () => {
    let signupController: SignupController;
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
            controllers: [SignupController],
            providers: [
                SignupServicio,
                {
                    provide: getRepositoryToken(Usuarios),
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
        it('should return User object after add', async () => {
            const mockResponse: any = {
                status: () => {
                    return {
                        json: () => {
                            return {
                                usuario: {
                                    nombre: 'foo',
                                    email: 'foo@foo.com',
                                    pasword: '123456',
                                    role: '1'
                                }
                            }
                        }
                    }
                }
            }
            const mockRequest: any = {
                body: {
                    user: {}
                }
            }
            signupController = app.get<SignupController>(SignupController);
            expect(await signupController.Signup(mockResponse, mockRequest)).toMatchObject({usuario: {
                nombre: 'foo',
                email: 'foo@foo.com',
                pasword: '123456',
                role: '1'
            }})
        });

        it('should return Ordenes object after add', async () => {
            const mockResponse: any = {
                status: () => {
                    return {
                        json: () => {
                            return {
                                usuario: {
                                    nombre: 'foo',
                                    email: 'foo@foo.com',
                                    pasword: '123456',
                                    role: '1'
                                }
                            }
                        }
                    }
                }
            }
            const mockRequest: any = {
                body: {
                    user: {}
                }
            }
            signupController = app.get<SignupController>(SignupController);
            expect(await signupController.Signup(mockResponse, mockRequest)).toMatchObject({usuario: {
                nombre: 'foo',
                email: 'foo@foo.com',
                pasword: '123456',
                role: '1'
            }})
        });
    });
});
