import { FastifyReply, FastifyRequest } from 'fastify';
import { TopicosOracleRepository } from '../../repositories/topicoOracleRepository';
import { DeleteTopicoUseCase } from './deleteTopicoUseCase';
import { z } from 'zod';

export const createTopicoBodySchema = z.object({
	id: z.number(),
});

export async function deleteTopicoController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createTopicoBodySchema.parse(request.params);

	const topicosRepository = new TopicosOracleRepository()
	const deleteTopicoUseCase = new DeleteTopicoUseCase(topicosRepository)
	const topico = await deleteTopicoUseCase.execute({ id });

	if (topico.isLeft())
		return reply
			.status(400)
			.send(topico.value.error)

	return reply
		.status(201)
		.send(topico.value.topico);
}
