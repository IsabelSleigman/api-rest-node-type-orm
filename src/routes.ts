import { Router, Request, Response } from 'express';
import { CreateUserController } from './controllers/CreateUserController';

const router = Router();
const creatUserController = new CreateUserController();

router.get('/', (request: Request, response: Response) => {

    return response.json({mensagem: 'Bem vindo a nossa API'});
});

router.post('/usuarios', creatUserController.handle);

export { router };