import { getConnection} from 'typeorm';
import createConnection from '../database';
import{ UsuarioController } from './UsuarioController';
import{ Request } from 'express';
import{ makeMockResponse} from '../utils/mocks/mockResponde';
import{ makeMockRequest } from '../utils/mocks/mockRequest';
import { FakeData} from '../utils/fakeData/fakeData';

describe('UsuarioController', () =>{

    beforeAll(async () =>{
        const connection = await createConnection()
        await connection.runMigrations()

    })
   
    afterAll(async () =>{
        const connection = await getConnection()
        await connection.query('DELETE FROM usuarios')
        await connection.close()
    })

    const fakeData = new FakeData();
    const usuarioController = new UsuarioController();

    const response = makeMockResponse();

    it('Deve retornar status 201 quando o usuário for criado', async ()=>{
        
        const request = {
            body: {
                nome: 'Algum usuário',
                email:'email@email.com'
            }
        } as Request

        await usuarioController.criarUsuario(request,response)

        expect(response.state.status).toBe(201);
        //expect(response.state.json).toBe()
    })

    it('Deve retornar status 400 quando o nome não for informado', async ()=>{
        
        const request = {
            body: {
                nome: '',
                email:'email@email.com'
            }
        } as Request;

        await usuarioController.criarUsuario(request,response)

        expect(response.state.status).toBe(400);
        //expect(response.state.json).toBe()
    })

    it('Deve retornar status 201 quando email não for informado', async ()=>{
        
        const request = {
            body: {
                nome: 'Nome qualquer',
                email:''
            }
        } as Request;

        await usuarioController.criarUsuario(request,response)

        expect(response.state.status).toBe(201);
        //expect(response.state.json).toBe()
    })

    it('Deve retornar status 200 quando retornar os usuarios', async ()=>{
        await fakeData.execute();

        const request = makeMockRequest({});

        await usuarioController.buscarUsuarios(request,response)

        expect(response.state.status).toBe(200);
        //expect(response.state.json).toBe()
    })

})