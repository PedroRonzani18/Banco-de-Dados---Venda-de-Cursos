import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { TopicoProfessorsOracleRepository } from '../../repositories/topicoProfessorOracleRepository';
import { UpdateTopicoProfessorUseCase } from './updateTopicoProfessorUseCase';

export const updateTopicoProfessorParamsSchema = z.object({
	id: z.number(),
});

export const updateTopicoProfessorBodySchema = z.object({
	idProfessor: z.number().optional(),
	idTopico: z.number().optional(),
});

export async function updateTopicoProfessorController(request: FastifyRequest, reply: FastifyReply) {

	const data = updateTopicoProfessorBodySchema.parse(request.body);
	const { id } = updateTopicoProfessorParamsSchema.parse(request.params);

	const topicoProfessorsRepository = new TopicoProfessorsOracleRepository()
	const updateTopicoProfessorUseCase = new UpdateTopicoProfessorUseCase(topicoProfessorsRepository)

	const topicoProfessor = await updateTopicoProfessorUseCase.execute({ id, data});

	if (topicoProfessor.isLeft())
		return reply
			.status(400)
			.send(topicoProfessor.value.error)

	return reply
		.status(201)
		.send(topicoProfessor.value.topicoProfessor);
}
