import { FastifyInstance } from 'fastify';
import { createController } from '../user/usecases/createUser/createUserController';
import { listUsersController } from '../user/usecases/listUsers/listUsersController';
import { findUserByNameController } from '../user/usecases/findUserByName/findUserByNameController';
import { findUserByIdController } from '../user/usecases/findUserById/findUserByIdController';
import { deleteUserController } from '../user/usecases/deleteUser/deleteUserController';
import { updateUserController } from '../user/usecases/updateUser/updateUserController';

export async function userRoutes(app: FastifyInstance) {

    app.post('/', createController)
    app.get('/', listUsersController)
    app.get('/id/:id', findUserByIdController)
    app.get('/nome/:nome', findUserByNameController)
    app.delete('/:id', deleteUserController)
    app.put('/:id', updateUserController)
}