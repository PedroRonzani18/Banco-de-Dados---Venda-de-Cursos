import { FastifyReply, FastifyRequest } from 'fastify';
import { TopicoProfessorsOracleRepository } from '../../repositories/topicoProfessorOracleRepository';
import { ListTopicoProfessorsUseCase } from './listTopicoProfessorsUseCase';

export async function listTopicoProfessorsController(request: FastifyRequest, reply: FastifyReply) {

	const topicoProfessorsRepository = new TopicoProfessorsOracleRepository()
    const listTopicoProfessorsUseCase = new ListTopicoProfessorsUseCase(topicoProfessorsRepository)

	const topicoProfessor = await listTopicoProfessorsUseCase.execute();

	if (topicoProfessor.isLeft())
		return reply
			.status(400)
			.send(topicoProfessor.value.error)

	return reply
		.status(201)
		.send(topicoProfessor.value.topicoProfessors);
}
