import { FastifyInstance } from 'fastify';
import { createAulaController } from '../aula/usecases/createAula/createAulaController';
import { listAulasController } from '../aula/usecases/listAulas/listAulasController';
import { findAulaByIdController } from '../aula/usecases/findAulaById/findAulaByIdController';
import { findAulaByTituloController } from '../aula/usecases/findAulaByTitulo/findAulaByTituloController';
import { deleteAulaController } from '../aula/usecases/deleteAula/deleteAulaController';
import { updateAulaController } from '../aula/usecases/updateAula/updateAulaController';

export async function aulaRoutes(app: FastifyInstance) {

    app.post('/', createAulaController)
    app.get('/', listAulasController)
    app.get('/id/:id', findAulaByIdController)
    app.get('/titulo', findAulaByTituloController)
    app.delete('/:id', deleteAulaController)
    app.put('/:id', updateAulaController)
}