import { FastifyReply, FastifyRequest } from 'fastify';
import { ProfessorsOracleRepository } from '../../repositories/professorOracleRepository';
import { FindProfessorByIdUseCase } from './findProfessorByIdUseCase';
import { z } from 'zod';

export const createProfessorBodySchema = z.object({
	id: z.string(),
});

export async function findProfessorByIdController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createProfessorBodySchema.parse(request.params);

	const professorsRepository = new ProfessorsOracleRepository()
    const findProfessorByIdUseCase = new FindProfessorByIdUseCase(professorsRepository)

	const professor = await findProfessorByIdUseCase.execute({ id });

	if (professor.isLeft())
		return reply
			.status(400)
			.send(professor.value.error)

	return reply
		.status(201)
		.send(professor.value.professor);
}
