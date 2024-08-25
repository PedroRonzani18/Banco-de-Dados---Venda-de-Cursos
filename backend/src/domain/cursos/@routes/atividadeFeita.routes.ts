import { FastifyInstance } from 'fastify';
import { createAtividadeFeitaController } from '../atividadeFeita/usecases/createAtividadeFeita/createAtividadeFeitaController';
import { listAtividadeFeitasController } from '../atividadeFeita/usecases/listAtividadeFeitas/listAtividadeFeitasController';
import { findAtividadeFeitaByIdController } from '../atividadeFeita/usecases/findAtividadeFeitaById/findAtividadeFeitaByIdController';
import { findAtividadeFeitaByTituloController } from '../atividadeFeita/usecases/findAtividadeFeitaByUsuarioAtividade/findAtividadeFeitaByUsuarioAtividadeController';
import { deleteAtividadeFeitaController } from '../atividadeFeita/usecases/deleteAtividadeFeita/deleteAtividadeFeitaController';
import { updateAtividadeFeitaController } from '../atividadeFeita/usecases/updateAtividadeFeita/updateAtividadeFeitaController';

export async function atividadefeitaRoutes(app: FastifyInstance) {

    app.post('/', createAtividadeFeitaController)
    app.get('/', listAtividadeFeitasController)
    app.get('/id/:id', findAtividadeFeitaByIdController)
    app.get('/titulo', findAtividadeFeitaByTituloController)
    app.delete('/:id', deleteAtividadeFeitaController)
    app.put('/:id', updateAtividadeFeitaController)
}