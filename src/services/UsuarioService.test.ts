import { getConnection} from 'typeorm';
import createConnection from '../database'
import { UsuarioService } from './UsuarioService';
import { v4 as uuid } from 'uuid';
import { FakeData } from '../utils/fakeData/fakeData';

describe('UsuarioService', ()=>{
    beforeAll(async () =>{
        const connection = await createConnection()
        await connection.runMigrations()

    })
   
    afterAll(async () =>{
        const connection = await getConnection()
        await connection.query('DELETE FROM usuarios')
        await connection.close()
    })
    
    const usuarioService = new UsuarioService();
    const fakeData = new FakeData();

    it('Deve retornar o Id do Usuario quando for criado'),async () => {
        
       const result = await usuarioService.criarUsuario({
            id: uuid(),
            nome: 'Qualquer nome',
            email: ''
        })

        expect.any(result).toHaveProperty('id')
    }

    it('Deve retornar todos os usuários cadastrados'),async () => {

       await fakeData.criarUsuarios();
       
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

        const result = await usuarioService.buscarUsuarios();

        expect(result).toMatchObject(expectdResponde);
    }

    it('Deve editar o nome do usuário',async () => {
        
        const usuario = await fakeData.criarUsuario();

        const result = await usuarioService.editarUsuario({
            id: usuario.id,
            nome: 'Outro nome',
            email: usuario.email

        });
        
        expect(result).toHaveLength(0);
    })

    it('Deve retornar um array vazio quando deletar usuário',async () => {
        
        const usuario = await fakeData.criarUsuario();

        const result = await usuarioService.excluirUsuario(usuario.id);
        
        expect(result).toHaveLength(0);
    })

    

    
})

