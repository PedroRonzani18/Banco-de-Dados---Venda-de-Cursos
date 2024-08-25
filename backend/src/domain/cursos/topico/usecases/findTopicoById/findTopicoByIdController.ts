import { FastifyReply, FastifyRequest } from 'fastify';
import { TopicosOracleRepository } from '../../repositories/topicoOracleRepository';
import { FindTopicoByIdUseCase } from './findTopicoByIdUseCase';
import { z } from 'zod';

export const createTopicoBodySchema = z.object({
	id: z.number(),
});

export async function findTopicoByIdController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createTopicoBodySchema.parse(request.params);

	const topicosRepository = new TopicosOracleRepository()
    const findTopicoByIdUseCase = new FindTopicoByIdUseCase(topicosRepository)

	const topico = await findTopicoByIdUseCase.execute({ id });

	if (topico.isLeft())
		return reply
			.status(400)
			.send(topico.value.error)

	return reply
		.status(201)
		.send(topico.value.topico);
}
