import{ UsuarioService } from '../../services/UsuarioService';
import { v4 as uuid } from 'uuid';

class FakeData{

    usuarioService = new UsuarioService();

   async criarUsuarios (){   
    await this.usuarioService.criarUsuario({
        id: uuid(),
        nome: 'Algum usuário',
        email: 'email@email.com'
    })

    await this.usuarioService.criarUsuario({
        id: uuid(),
        nome: 'Algum usuário',
        email: ''
    })
   }

  async criarUsuario (){
   const usuario =  await this.usuarioService.criarUsuario({
        id: uuid(),
        nome: 'Algum usuário',
        email: 'email@email.com'
    })
    return usuario;
  }
}

export { FakeData }