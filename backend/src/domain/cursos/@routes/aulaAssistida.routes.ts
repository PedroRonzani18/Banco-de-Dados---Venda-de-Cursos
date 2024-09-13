import { FastifyInstance } from 'fastify';
import { createAulaAssistidaController } from '../aluaAssistida/usecases/createAulaAssistida/createAulaAssistidaController';
import { listAulaAssistidasController } from '../aluaAssistida/usecases/listAulaAssistidas/listAulaAssistidasController';
import { findAulaAssistidaByIdController } from '../aluaAssistida/usecases/findAulaAssistidaById/findAulaAssistidaByIdController';
import { findAulaAssistidaByNomeController } from '../aluaAssistida/usecases/findAulaAssistidaByTitulo/findAulaAssistidaByTituloController';
import { deleteAulaAssistidaController } from '../aluaAssistida/usecases/deleteAulaAssistida/deleteAulaAssistidaController';
import { updateAulaAssistidaController } from '../aluaAssistida/usecases/updateAulaAssistida/updateAulaAssistidaController';
import { leftJoinController } from '../aluaAssistida/usecases/leftJoin/leftJoinController';

export async function aulaAssistidaRoutes(app: FastifyInstance) {

    app.post('/', createAulaAssistidaController)
    app.get('/', listAulaAssistidasController)
    app.get('/id/:id', findAulaAssistidaByIdController)
    app.put('/titulo/', findAulaAssistidaByNomeController)
    app.delete('/:id', deleteAulaAssistidaController)
    app.put('/:id', updateAulaAssistidaController)
    app.put('/left/', leftJoinController)
}