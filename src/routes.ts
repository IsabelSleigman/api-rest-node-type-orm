import { Router, Request, Response } from 'express';
import { UsuarioController } from './controllers/UsuarioController';

const router = Router();
const usuarioController = new UsuarioController();

router.get('/', (request: Request, response: Response) => {

    return response.json({mensagem: 'Bem vindo a nossa API'});
});

router.post('/usuarios', usuarioController.criarUsuario);
router.get('/usuarios', usuarioController.buscarUsuarios);

export { router };