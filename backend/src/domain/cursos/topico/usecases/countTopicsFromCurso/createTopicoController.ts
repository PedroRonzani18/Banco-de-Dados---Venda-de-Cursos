import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { TopicosOracleRepository } from '../../repositories/topicoOracleRepository';
import { CountTopicoUseCase } from './createTopicoUseCase';

export const countTopicoBodySchema = z.object({
	id: z.string(),
});

export async function countTopicoController(request: FastifyRequest, reply: FastifyReply) {

	const { id } = countTopicoBodySchema.parse(request.params);

	const topicosRepository = new TopicosOracleRepository()
	const countTopicoUseCase = new CountTopicoUseCase(topicosRepository)

	const topico = await countTopicoUseCase.execute({ cursoId: Number(id) });

	if (topico.isLeft())
		return reply
			.status(400)
			.send(topico.value.error)

	return reply
		.status(201)
		.send(topico.value.topico);
}
