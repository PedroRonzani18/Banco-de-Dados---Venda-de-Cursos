import { FastifyReply, FastifyRequest } from 'fastify';
import { TopicoProfessorsOracleRepository } from '../../repositories/topicoProfessorOracleRepository';
import { DeleteTopicoProfessorUseCase } from './deleteTopicoProfessorUseCase';
import { z } from 'zod';

export const createTopicoProfessorBodySchema = z.object({
	id: z.number(),
});

export async function deleteTopicoProfessorController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createTopicoProfessorBodySchema.parse(request.params);

	const topicoProfessorsRepository = new TopicoProfessorsOracleRepository()
	const deleteTopicoProfessorUseCase = new DeleteTopicoProfessorUseCase(topicoProfessorsRepository)
	const topicoProfessor = await deleteTopicoProfessorUseCase.execute({ id });

	if (topicoProfessor.isLeft())
		return reply
			.status(400)
			.send(topicoProfessor.value.error)

	return reply
		.status(201)
		.send(topicoProfessor.value.topicoProfessor);
}
