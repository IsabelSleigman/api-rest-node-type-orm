import { getConnection} from 'typeorm';
import createConnection from '../database'
import{ GetAllUserService } from './GetAllUserServices';
import { FakeData} from '../utils/fakeData/fakeData'

describe('GetAllUserService', ()=>{
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

    it('Deve retornar todos os usuários cadastrados'),async () => {

       await fakeData.execute();
       
        const expectdResponde = [
            {
                nome: 'Algum usuário',
                email: 'email@email.com'
            },
            {
                nome: 'Algum usuário',
                email: ''
            }
        ]

        const getAllUserService = new GetAllUserService();

        const result = await getAllUserService.execute();

        expect(result).toMatchObject(expectdResponde);
    }

})