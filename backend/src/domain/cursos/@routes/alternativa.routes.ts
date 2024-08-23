import { FastifyInstance } from 'fastify';
import { createAlternativaController } from '../alternativa/usecases/createAlternativa/createAlternativaController';
import { listAlternativasController } from '../alternativa/usecases/listAlternativas/listAlternativasController';
import { findAlternativaByIdController } from '../alternativa/usecases/findAlternativaById/findAlternativaByIdController';
import { findAlternativaByNumeroAtividadeIdController } from '../alternativa/usecases/findAlternativaByNumeroAtividadeId/findAlternativaByNumeroAtividadeIdController';
import { deleteAlternativaController } from '../alternativa/usecases/deleteAlternativa/deleteAlternativaController';
import { updateAlternativaController } from '../alternativa/usecases/updateAlternativa/updateAlternativaController';

export async function alternativaRoutes(app: FastifyInstance) {

    app.post('/', createAlternativaController)
    app.get('/', listAlternativasController)
    app.get('/id/:id', findAlternativaByIdController)
    app.get('/name/:name', findAlternativaByNumeroAtividadeIdController)
    app.delete('/:id', deleteAlternativaController)
    app.put('/:id', updateAlternativaController)
}