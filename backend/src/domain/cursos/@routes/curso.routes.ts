import { FastifyInstance } from 'fastify';
import { createCursoController } from '../curso/usecases/createCurso/createCursoController';
import { listCursosController } from '../curso/usecases/listCursos/listCursosController';
import { findCursoByIdController } from '../curso/usecases/findCursoById/findCursoByIdController';
import { deleteCursoController } from '../curso/usecases/deleteCurso/deleteCursoController';
import { updateCursoController } from '../curso/usecases/updateCurso/updateCursoController';
import { findCursoByNomeController } from '../curso/usecases/findCursoByNome/findCursoByNomeController';
import { listCursosByIdController } from '../curso/usecases/listCursosById/listCursosByIdController';
import { listCoursesEnrolledToUserController } from '../curso/usecases/listCoursesEnrolledToUser/listCoursesEnrolledToUserController';
import { listProfessoresFromCursoController } from '../curso/usecases/listProfessoresFromCurso/listProfessoresFromCursoController';
import { listTemasFromCursoController } from '../curso/usecases/listTemasFromCurso/listTemasFromCursoController';

export async function cursoRoutes(app: FastifyInstance) {

    app.post('/', createCursoController)
    app.get('/', listCursosController)
    app.get('/list/:id', listCursosByIdController)
    app.get('/list/user/:userid', listCoursesEnrolledToUserController)
    app.get('/list/professores/:id', listProfessoresFromCursoController)
    app.get('/list/temas/:id', listTemasFromCursoController)
    app.get('/id/:id', findCursoByIdController)
    app.get('/titulo', findCursoByNomeController)
    app.delete('/:id', deleteCursoController)
    app.put('/:id', updateCursoController)
}