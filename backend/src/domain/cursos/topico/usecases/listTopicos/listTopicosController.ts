import { FastifyReply, FastifyRequest } from 'fastify';
import { TopicosOracleRepository } from '../../repositories/topicoOracleRepository';
import { ListTopicosUseCase } from './listTopicosUseCase';

export async function listTopicosController(request: FastifyRequest, reply: FastifyReply) {

	const topicosRepository = new TopicosOracleRepository()
    const listTopicosUseCase = new ListTopicosUseCase(topicosRepository)

	const topico = await listTopicosUseCase.execute();

	if (topico.isLeft())
		return reply
			.status(400)
			.send(topico.value.error)

	return reply
		.status(201)
		.send(topico.value.topicos);
}
