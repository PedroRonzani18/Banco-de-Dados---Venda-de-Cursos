import { FastifyReply, FastifyRequest } from 'fastify';
import { TopicoProfessorsOracleRepository } from '../../repositories/topicoProfessorOracleRepository';
import { FindTopicoProfessorByIdUseCase } from './findTopicoProfessorByIdUseCase';
import { z } from 'zod';

export const createTopicoProfessorBodySchema = z.object({
	id: z.number(),
});

export async function findTopicoProfessorByIdController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createTopicoProfessorBodySchema.parse(request.params);

	const topicoProfessorsRepository = new TopicoProfessorsOracleRepository()
    const findTopicoProfessorByIdUseCase = new FindTopicoProfessorByIdUseCase(topicoProfessorsRepository)

	const topicoProfessor = await findTopicoProfessorByIdUseCase.execute({ id });

	if (topicoProfessor.isLeft())
		return reply
			.status(400)
			.send(topicoProfessor.value.error)

	return reply
		.status(201)
		.send(topicoProfessor.value.topicoProfessor);
}
