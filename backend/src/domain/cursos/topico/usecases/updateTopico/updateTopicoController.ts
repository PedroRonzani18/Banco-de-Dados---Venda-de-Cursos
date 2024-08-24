import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { TopicosOracleRepository } from '../../repositories/topicoOracleRepository';
import { UpdateTopicoUseCase } from './updateTopicoUseCase';

export const updateTopicoParamsSchema = z.object({
	id: z.string(),
});

export const updateTopicoBodySchema = z.object({
	enunciado: z.string().optional(),
	titulo: z.string().optional(),
});

export async function updateTopicoController(request: FastifyRequest, reply: FastifyReply) {

	const { enunciado, titulo } = updateTopicoBodySchema.parse(request.body);
	const { id } = updateTopicoParamsSchema.parse(request.params);

	const topicosRepository = new TopicosOracleRepository()
	const updateTopicoUseCase = new UpdateTopicoUseCase(topicosRepository)

	const topico = await updateTopicoUseCase.execute({ id, enunciado, titulo });

	if (topico.isLeft())
		return reply
			.status(400)
			.send(topico.value.error)

	return reply
		.status(201)
		.send(topico.value.topico);
}
