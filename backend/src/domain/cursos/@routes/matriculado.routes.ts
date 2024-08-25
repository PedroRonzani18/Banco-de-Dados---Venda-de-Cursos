import { FastifyInstance } from 'fastify';
import { createMatriculadoController } from '../matriculado/usecases/createMatriculado/createMatriculadoController';
import { listMatriculadosController } from '../matriculado/usecases/listMatriculados/listMatriculadosController';
import { findMatriculadoByIdController } from '../matriculado/usecases/findMatriculadoById/findMatriculadoByIdController';
import { deleteMatriculadoController } from '../matriculado/usecases/deleteMatriculado/deleteMatriculadoController';
import { updateMatriculadoController } from '../matriculado/usecases/updateMatriculado/updateMatriculadoController';
import { findMatriculadoByTituloController } from '../matriculado/usecases/findMatriculadoByUsuarioCurso/findMatriculadoByUsuarioCursoController';

export async function matriculadoRoutes(app: FastifyInstance) {

    app.post('/', createMatriculadoController)
    app.get('/', listMatriculadosController)
    app.get('/id/:id', findMatriculadoByIdController)
    app.get('/titulo', findMatriculadoByTituloController)
    app.delete('/:id', deleteMatriculadoController)
    app.put('/:id', updateMatriculadoController)
}