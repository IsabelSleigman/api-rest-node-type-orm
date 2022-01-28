import { getConnection} from 'typeorm';
import createConnection from '../database'
import{ CreateUserService } from './CreateUserService';
import { v4 as uuid } from 'uuid';

describe('CreateUserService', ()=>{
    beforeAll(async () =>{
        const connection = await createConnection()
        await connection.runMigrations()

    })
   
    afterAll(async () =>{
        const connection = await getConnection()
        await connection.query('DELETE FROM usuarios')
        await connection.close()
    })
    
    const createUserService = new CreateUserService();

    it('Deve retornar o Id do Usuario quando for criado'),async () => {
        
       const result = await createUserService.execute({
            id: uuid(),
            nome: 'Qualquer nome',
            email: ''
        })

        expect.any(result).toHaveProperty('id')
    }
})

