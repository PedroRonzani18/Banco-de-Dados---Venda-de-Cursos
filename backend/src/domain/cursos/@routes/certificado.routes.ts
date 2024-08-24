import { FastifyInstance } from 'fastify';
import { createCertificadoController } from '../certificado/usecases/createCertificado/createCertificadoController';
import { listCertificadosController } from '../certificado/usecases/listCertificados/listCertificadosController';
import { findCertificadoByIdController } from '../certificado/usecases/findCertificadoById/findCertificadoByIdController';
import { deleteCertificadoController } from '../certificado/usecases/deleteCertificado/deleteCertificadoController';
import { updateCertificadoController } from '../certificado/usecases/updateCertificado/updateCertificadoController';
import { findCertificadoByTituloController } from '../certificado/usecases/findCertificadoByUsuarioCurso/findCertificadoByUsuarioCursoController';

export async function certificadoRoutes(app: FastifyInstance) {

    app.post('/', createCertificadoController)
    app.get('/', listCertificadosController)
    app.get('/id/:id', findCertificadoByIdController)
    app.get('/titulo', findCertificadoByTituloController)
    app.delete('/:id', deleteCertificadoController)
    app.put('/:id', updateCertificadoController)
}