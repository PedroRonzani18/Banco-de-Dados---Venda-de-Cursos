import { FastifyInstance } from 'fastify';
import { createController } from '../user/usecases/createUser/createUserController';
import { listUsersController } from '../user/usecases/listUsers/listUsersController';
import { findUserByloginController } from '../user/usecases/findUserByLogin/findUserByLoginController';
import { findUserByIdController } from '../user/usecases/findUserById/findUserByIdController';
import { deleteUserController } from '../user/usecases/deleteUser/deleteUserController';
import { updateUserController } from '../user/usecases/updateUser/updateUserController';
import { loginUserController } from '../user/usecases/loginUser/loginUserController';

export async function userRoutes(app: FastifyInstance) {

    app.post('/', createController)
    app.post('/login', loginUserController)
    app.get('/', listUsersController)
    app.get('/id/:id', findUserByIdController)
    app.get('/nome/:nome', findUserByloginController)
    app.delete('/:id', deleteUserController)
    app.put('/:id', updateUserController)
}