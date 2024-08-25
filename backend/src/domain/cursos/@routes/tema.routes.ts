import { FastifyInstance } from 'fastify';
import { createTemaController } from '../tema/usecases/createTema/createTemaController';
import { listTemasController } from '../tema/usecases/listTemas/listTemasController';
import { findTemaByIdController } from '../tema/usecases/findTemaById/findTemaByIdController';
import { deleteTemaController } from '../tema/usecases/deleteTema/deleteTemaController';
import { updateTemaController } from '../tema/usecases/updateTema/updateTemaController';
import { findTemaByNomeController } from '../tema/usecases/findTemaByNome/findTemaByNomeController';

export async function temaRoutes(app: FastifyInstance) {

    app.post('/', createTemaController)
    app.get('/', listTemasController)
    app.get('/id/:id', findTemaByIdController)
    app.get('/titulo', findTemaByNomeController)
    app.delete('/:id', deleteTemaController)
    app.put('/:id', updateTemaController)
}