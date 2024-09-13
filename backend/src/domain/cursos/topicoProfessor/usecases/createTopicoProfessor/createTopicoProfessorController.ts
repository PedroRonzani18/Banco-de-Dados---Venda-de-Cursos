import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { TopicoProfessorsOracleRepository } from '../../repositories/topicoProfessorOracleRepository';
import { CreateTopicoProfessorUseCase } from './createTopicoProfessorUseCase';

export const createTopicoProfessorBodySchema = z.object({
	idProfessor: z.number(),
	idTopico: z.number(),
});

export async function createTopicoProfessorController(request: FastifyRequest, reply: FastifyReply) {

	try {
		const { idProfessor, idTopico } = createTopicoProfessorBodySchema.parse(request.body);

		const topicoProfessorsRepository = new TopicoProfessorsOracleRepository()
		const createTopicoProfessorUseCase = new CreateTopicoProfessorUseCase(topicoProfessorsRepository)

		const topicoProfessor = await createTopicoProfessorUseCase.execute({ idProfessor, idTopico });

		if (topicoProfessor.isLeft())
			return reply
				.status(400)
				.send(topicoProfessor.value.error)

		return reply
			.status(201)
			.send(topicoProfessor.value.topicoProfessor);
	} catch (error) {
		console.dir(error, { depth: null });
		throw error;
	}
}
