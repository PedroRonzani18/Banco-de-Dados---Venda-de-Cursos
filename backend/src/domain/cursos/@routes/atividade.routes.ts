import { FastifyInstance } from 'fastify';
import { createAtividadeController } from '../atividade/usecases/createAtividade/createAtividadeController';
import { listAtividadesController } from '../atividade/usecases/listAtividades/listAtividadesController';
import { findAtividadeByIdController } from '../atividade/usecases/findAtividadeById/findAtividadeByIdController';
import { findAtividadeByTituloController } from '../atividade/usecases/findAtividadeByTitulo/findAtividadeByTituloController';
import { deleteAtividadeController } from '../atividade/usecases/deleteAtividade/deleteAtividadeController';
import { updateAtividadeController } from '../atividade/usecases/updateAtividade/updateAtividadeController';

export async function atividadeRoutes(app: FastifyInstance) {

    app.post('/', createAtividadeController)
    app.get('/', listAtividadesController)
    app.get('/id/:id', findAtividadeByIdController)
    app.get('/titulo', findAtividadeByTituloController)
    app.delete('/:id', deleteAtividadeController)
    app.put('/:id', updateAtividadeController)
}