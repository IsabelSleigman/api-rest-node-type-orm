import{ CreateUserController } from './CreateUserController';

describe('CreateUserController', () =>{
   
    it('Deve retornar o id do usuário criado', ()=>{
        const createUserController = new CreateUserController();

        const result = createUserController.handle;
    })
})