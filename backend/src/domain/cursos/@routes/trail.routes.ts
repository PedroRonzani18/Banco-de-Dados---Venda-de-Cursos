import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/domain/users/middlewares/verify-jwt';
import { createController } from '../alternativa/usecases/createTrail/createTrailController';
import { listTrailsController } from '../alternativa/usecases/listTrails/listTrailsController';
import { findTrailByNameController } from '../alternativa/usecases/findTrailByName/findTrailByNameController';
import { findTrailByIdController } from '../alternativa/usecases/findTrailById/findTrailByIdController';
import { deleteTrailController } from '../alternativa/usecases/deleteTrail/deleteTrailController';
import { updateTrailController } from '../alternativa/usecases/updateTrail/updateTrailController';
import { verifyUserRole } from '@/domain/users/middlewares/verify-user-role';

export async function trailRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/', { onRequest: [verifyUserRole('ADMIN')] }, createController)
    app.get('/list', listTrailsController)
    app.get('/id/:id', findTrailByIdController)
    app.get('/name/:name', findTrailByNameController)
    app.delete('/:id', { onRequest: [verifyUserRole('ADMIN')] }, deleteTrailController)
    app.put('/:id', { onRequest: [verifyUserRole('ADMIN')] }, updateTrailController)
}