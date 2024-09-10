import { FastifyReply, FastifyRequest } from 'fastify';
import { TopicosOracleRepository } from '../../repositories/topicoOracleRepository';
import { ListTopicosByIdUseCase } from './listTopicosByIdUseCase';
import { z } from 'zod';

const idSchema = z.object({
	id: z.string()
});

export async function listTopicosByIdController(request: FastifyRequest, reply: FastifyReply) {

	const { id } = idSchema.parse(request.params);

	const topicosRepository = new TopicosOracleRepository()
    const listTopicosUseCase = new ListTopicosByIdUseCase(topicosRepository)

	const topico = await listTopicosUseCase.execute({ id: Number(id) });

	if (topico.isLeft())
		return reply
			.status(400)
			.send(topico.value.error)

	return reply
		.status(201)
		.send(topico.value.topicos);
}
