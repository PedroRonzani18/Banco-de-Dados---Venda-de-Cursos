import { FastifyInstance } from 'fastify';
import { createTopicoProfessorController } from '../topicoProfessor/usecases/createTopicoProfessor/createTopicoProfessorController';
import { listTopicoProfessorsController } from '../topicoProfessor/usecases/listTopicoProfessors/listTopicoProfessorsController';
import { findTopicoProfessorByIdController } from '../topicoProfessor/usecases/findTopicoProfessorById/findTopicoProfessorByIdController';
import { findTopicoProfessorByNomeController } from '../topicoProfessor/usecases/findTopicoProfessorByNome/findTopicoProfessorByNomeController';
import { deleteTopicoProfessorController } from '../topicoProfessor/usecases/deleteTopicoProfessor/deleteTopicoProfessorController';
import { updateTopicoProfessorController } from '../topicoProfessor/usecases/updateTopicoProfessor/updateTopicoProfessorController';

export async function topicoProfessorRoutes(app: FastifyInstance) {

    app.post('/', createTopicoProfessorController)
    app.get('/', listTopicoProfessorsController)
    app.get('/id/:id', findTopicoProfessorByIdController)
    app.get('/titulo', findTopicoProfessorByNomeController)
    app.delete('/:id', deleteTopicoProfessorController)
    app.put('/:id', updateTopicoProfessorController)
}