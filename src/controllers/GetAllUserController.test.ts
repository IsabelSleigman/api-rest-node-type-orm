import { getConnection} from 'typeorm';
import createConnection from '../database'
import{ GetAllUserController } from './GetAllUserController'
import{ makeMockResponse} from '../utils/mocks/mockResponde';
import{ makeMockRequest } from '../utils/mocks/mockRequest';
import { FakeData} from '../utils/fakeData/fakeData';

describe('GetAllUserController ', () =>{

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
    const getAllUserController  = new GetAllUserController ();

    const response = makeMockResponse();

    it('Deve retornar status 200 quando retornar os usuarios', async ()=>{
        await fakeData.execute();

        const getAllUserController  = new GetAllUserController ();

        const request = makeMockRequest({});
        const response = makeMockResponse();

        await getAllUserController.handle(request,response)

        expect(response.state.status).toBe(200);
        //expect(response.state.json).toBe()
    })

   
})