import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { TopicosOracleRepository } from '../../repositories/topicoOracleRepository';
import { CreateTopicoUseCase } from './createTopicoUseCase';

export const createTopicoBodySchema = z.object({
	cursoId: z.number(),
	index: z.number().optional().default(0),
	titulo: z.string(),
	descricao: z.string(),
});

export async function createTopicoController(request: FastifyRequest, reply: FastifyReply) {
	try {
		const { cursoId, descricao, index, titulo } = createTopicoBodySchema.parse(request.body);

		const topicosRepository = new TopicosOracleRepository()
		const createTopicoUseCase = new CreateTopicoUseCase(topicosRepository)

		const topico = await createTopicoUseCase.execute({ descricao, cursoId, index, titulo });

		if (topico.isLeft())
			return reply
				.status(400)
				.send(topico.value.error)

		return reply
			.status(201)
			.send(topico.value.topico);
	} catch (error) {
		console.error(error)
		throw error
	}
}
