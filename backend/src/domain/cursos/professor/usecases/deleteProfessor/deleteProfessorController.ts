import { FastifyReply, FastifyRequest } from 'fastify';
import { ProfessorsOracleRepository } from '../../repositories/professorOracleRepository';
import { DeleteProfessorUseCase } from './deleteProfessorUseCase';
import { z } from 'zod';

export const createProfessorBodySchema = z.object({
	id: z.string(),
});

export async function deleteProfessorController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createProfessorBodySchema.parse(request.params);

	const professorsRepository = new ProfessorsOracleRepository()
	const deleteProfessorUseCase = new DeleteProfessorUseCase(professorsRepository)
	const professor = await deleteProfessorUseCase.execute({ id });

	if (professor.isLeft())
		return reply
			.status(400)
			.send(professor.value.error)

	return reply
		.status(201)
		.send(professor.value.professor);
}
