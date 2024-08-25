import { FastifyReply, FastifyRequest } from 'fastify';
import { TopicoProfessorsOracleRepository } from '../../repositories/topicoProfessorOracleRepository';
import { z } from 'zod';
import { FindTopicoProfessorByNomeUseCase } from './findTopicoProfessorByNomeUseCase';

export const createTopicoProfessorBodySchema = z.object({
	idProfessor: z.number(),
	idTopico: z.number(),
});

export async function findTopicoProfessorByNomeController(request: FastifyRequest, reply: FastifyReply) {

    const { idProfessor, idTopico } = createTopicoProfessorBodySchema.parse(request.body);

	const topicoProfessorsRepository = new TopicoProfessorsOracleRepository()
    const findTopicoProfessorByIdUseCase = new FindTopicoProfessorByNomeUseCase(topicoProfessorsRepository)

	const topicoProfessor = await findTopicoProfessorByIdUseCase.execute({ idProfessor, idTopico });

	if (topicoProfessor.isLeft())
		return reply
			.status(400)
			.send(topicoProfessor.value.error)

	return reply
		.status(201)
		.send(topicoProfessor.value.topicoProfessor);
}
