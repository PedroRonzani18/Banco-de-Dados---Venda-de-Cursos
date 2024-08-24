import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie';
import { userRoutes } from '@/domain/users/@routes/user.routes';
import { alternativaRoutes } from '@/domain/cursos/@routes/alternativa.routes';
import { atividadeRoutes } from '@/domain/cursos/@routes/atividade.routes';
import { atividadefeitaRoutes } from '@/domain/cursos/@routes/atividadeFeita.routes';

export const app = fastify()

app.register(fastifyCookie)

app.register(userRoutes, { prefix: 'user' })

app.register(alternativaRoutes, { prefix: 'alternativa' })
app.register(atividadeRoutes, { prefix: 'atividade' })
app.register(atividadefeitaRoutes, { prefix: 'atividadeFeita' })