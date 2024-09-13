import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
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
import { aulaRoutes } from '@/domain/cursos/@routes/aula.routes';
import { topicoTemaRoutes } from '@/domain/cursos/@routes/topicoTema.routes';
import { topicoProfessorRoutes } from '@/domain/cursos/@routes/topicoProfessor.routes';
import { aulaAssistidaRoutes } from '@/domain/cursos/@routes/aulaAssistida.routes';

export const app = fastify()

app.register(fastifyCookie)

app.register(fastifyCors, {
    origin: '*', // Permitir todas as origens, você pode especificar as permitidas se quiser mais segurança
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
});


app.register(userRoutes, { prefix: 'user' })

app.register(alternativaRoutes, { prefix: 'alternativa' })
app.register(atividadeRoutes, { prefix: 'atividade' })
app.register(atividadefeitaRoutes, { prefix: 'atividade-feita' })
app.register(aulaAssistidaRoutes, { prefix: 'aula-assistida' })
app.register(aulaRoutes, { prefix: 'aula' })
app.register(certificadoRoutes, { prefix: 'certificado' })
app.register(cursoRoutes, { prefix: 'curso' })
app.register(matriculadoRoutes, { prefix: 'matriculado' })
app.register(professorRoutes, { prefix: 'professor' })
app.register(temaRoutes, { prefix: 'tema' })
app.register(topicoRoutes, { prefix: 'topico' })
app.register(topicoTemaRoutes, { prefix: 'topico-tema' })
app.register(topicoProfessorRoutes, { prefix: 'topico-professor' })