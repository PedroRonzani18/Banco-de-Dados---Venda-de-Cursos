import { FastifyInstance } from 'fastify';
import { createProfessorController } from '../professor/usecases/createProfessor/createProfessorController';
import { listProfessorsController } from '../professor/usecases/listProfessors/listProfessorsController';
import { findProfessorByIdController } from '../professor/usecases/findProfessorById/findProfessorByIdController';
import { deleteProfessorController } from '../professor/usecases/deleteProfessor/deleteProfessorController';
import { updateProfessorController } from '../professor/usecases/updateProfessor/updateProfessorController';
import { findProfessorByNomeController } from '../professor/usecases/findProfessorByNome/findProfessorByNomeController';

export async function professorRoutes(app: FastifyInstance) {

    app.post('/', createProfessorController)
    app.get('/', listProfessorsController)
    app.get('/id/:id', findProfessorByIdController)
    app.get('/titulo', findProfessorByNomeController)
    app.delete('/:id', deleteProfessorController)
    app.put('/:id', updateProfessorController)
}