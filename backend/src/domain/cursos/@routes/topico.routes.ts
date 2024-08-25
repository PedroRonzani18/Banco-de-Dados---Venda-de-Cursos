import { FastifyInstance } from 'fastify';
import { createTopicoController } from '../topico/usecases/createTopico/createTopicoController';
import { listTopicosController } from '../topico/usecases/listTopicos/listTopicosController';
import { findTopicoByIdController } from '../topico/usecases/findTopicoById/findTopicoByIdController';
import { deleteTopicoController } from '../topico/usecases/deleteTopico/deleteTopicoController';
import { updateTopicoController } from '../topico/usecases/updateTopico/updateTopicoController';
import { findTopicoByTituloController } from '../topico/usecases/findTopicoByTitulo/findTopicoByTituloController';

export async function topicoRoutes(app: FastifyInstance) {

    app.post('/', createTopicoController)
    app.get('/', listTopicosController)
    app.get('/id/:id', findTopicoByIdController)
    app.get('/titulo', findTopicoByTituloController)
    app.delete('/:id', deleteTopicoController)
    app.put('/:id', updateTopicoController)
}