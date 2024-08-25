import { FastifyInstance } from 'fastify';
import { createTopicoTemaController } from '../topicoTema/usecases/createTopicoTema/createTopicoTemaController';
import { listTopicoTemasController } from '../topicoTema/usecases/listTopicoTemas/listTopicoTemasController';
import { findTopicoTemaByIdController } from '../topicoTema/usecases/findTopicoTemaById/findTopicoTemaByIdController';
import { deleteTopicoTemaController } from '../topicoTema/usecases/deleteTopicoTema/deleteTopicoTemaController';
import { updateTopicoTemaController } from '../topicoTema/usecases/updateTopicoTema/updateTopicoTemaController';
import { findTopicoTemaByNomeController } from '../topicoTema/usecases/findTopicoTemaByTitulo/findTopicoTemaByTituloController';

export async function topicoTemaRoutes(app: FastifyInstance) {

    app.post('/', createTopicoTemaController)
    app.get('/', listTopicoTemasController)
    app.get('/id/:id', findTopicoTemaByIdController)
    app.get('/titulo', findTopicoTemaByNomeController)
    app.delete('/:id', deleteTopicoTemaController)
    app.put('/:id', updateTopicoTemaController)
}