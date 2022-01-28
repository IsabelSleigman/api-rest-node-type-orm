import { getRepository } from 'typeorm';
import { Usuario } from '../entities/Usuario';
interface IUsuario{
    id: string,
    nome: string,
    email?: string
}

class UsuarioService{

    async criarUsuario({id, nome, email}:IUsuario){

        const usuario = await getRepository(Usuario)
            .createQueryBuilder()
            .insert()
            .into(Usuario)
            .values([
                {
                    id: id,
                    nome: nome,
                    email: email
                }
            ])
            .execute();

        return usuario.identifiers[0];
    }

    async buscarUsuarios(){
        const usuarios = await getRepository(Usuario)
        .createQueryBuilder('usuarios')
        .select()
        .getMany()

        console.log(usuarios)
        return usuarios
    }

    async editarUsuario({id, nome, email}: IUsuario){
        const usuario = await getRepository(Usuario)
        .createQueryBuilder('usuarios')
        .update()
        .set({nome: nome, email: email})
        .where("id = :id", {id})
        .execute();

        return usuario.raw
    }

    async excluirUsuario(usuarioId: string){
        const usuario = await getRepository(Usuario)
        .createQueryBuilder()
        .delete()
        .from('usuarios')
        .where("id = :id", {usuarioId})
        .execute();

        return usuario.raw
    }

}

export {UsuarioService}