import { userRoutes } from '@/domain/users/controllers/user/routes'
import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie';

export const app = fastify()

app.register(fastifyCookie)

app.register(userRoutes, { prefix: 'user' })

