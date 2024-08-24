import { FastifyReply, FastifyRequest } from 'fastify';
import { TopicosOracleRepository } from '../../repositories/topicoOracleRepository';
import { z } from 'zod';
import { FindTopicoByTituloUseCase } from './findTopicoByTituloUseCase';

export const createTopicoBodySchema = z.object({
	idCurso: z.string(),
	titulo: z.string(),
});

export async function findTopicoByTituloController(request: FastifyRequest, reply: FastifyReply) {

    const { idCurso, titulo } = createTopicoBodySchema.parse(request.body);

	const topicosRepository = new TopicosOracleRepository()
    const findTopicoByIdUseCase = new FindTopicoByTituloUseCase(topicosRepository)

	const topico = await findTopicoByIdUseCase.execute({ idCurso, titulo });

	if (topico.isLeft())
		return reply
			.status(400)
			.send(topico.value.error)

	return reply
		.status(201)
		.send(topico.value.topico);
}
