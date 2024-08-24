import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie';
import { userRoutes } from '@/domain/users/@routes/user.routes';
import { alternativaRoutes } from '@/domain/cursos/@routes/alternativa.routes';
import { atividadeRoutes } from '@/domain/cursos/@routes/atividade.routes';
import { atividadefeitaRoutes } from '@/domain/cursos/@routes/atividadeFeita.routes';
import { certificadoRoutes } from '@/domain/cursos/@routes/certificado.routes';
import { cursoRoutes } from '@/domain/cursos/@routes/curso.routes';
import { matriculadoRoutes } from '@/domain/cursos/@routes/matriculado.routes';
import { professorRoutes } from '@/domain/cursos/@routes/professor.routes';
import { temaRoutes } from '@/domain/cursos/@routes/tema.routes';
import { topicoRoutes } from '@/domain/cursos/@routes/topico.routes';

export const app = fastify()

app.register(fastifyCookie)

app.register(userRoutes, { prefix: 'user' })

app.register(alternativaRoutes, { prefix: 'alternativa' })
app.register(atividadeRoutes, { prefix: 'atividade' })
app.register(atividadefeitaRoutes, { prefix: 'atividadeFeita' })
app.register(certificadoRoutes, { prefix: 'certificado' })
app.register(cursoRoutes, { prefix: 'curso' })
app.register(matriculadoRoutes, { prefix: 'matriculado' })
app.register(professorRoutes, { prefix: 'professor' })
app.register(temaRoutes, { prefix: 'tema' })
app.register(topicoRoutes, { prefix: 'topico' })