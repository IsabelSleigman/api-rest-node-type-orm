import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { UsuarioService } from '../services/UsuarioService';

class UsuarioController{

   async criarUsuario(request: Request, response: Response){

        const usuarioService = new UsuarioService();

        const { nome } = request.body;
        const { email } = request.body;
        const id = uuid();

        if(nome.length == 0){
            return response.status(400).json({mensagem: 'Preencha todos os campos'})
        }

        const user = await usuarioService.createUser({id, nome, email});
        return response.status(201).json(user);
    }

    async buscarUsuarios(request: Request, response: Response){
        const usuarioService = new UsuarioService();
 
        const users = await usuarioService.buscarUsuarios();
 
         return response.status(200).json(users);
     }
}

export{ UsuarioController }