import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ProfessorsOracleRepository } from '../../repositories/professorOracleRepository';
import { CreateProfessorUseCase } from './createProfessorUseCase';

export const createProfessorBodySchema = z.object({
	nome: z.string(),
});

export async function createProfessorController(request: FastifyRequest, reply: FastifyReply) {

	const { nome } = createProfessorBodySchema.parse(request.body);

	const professorsRepository = new ProfessorsOracleRepository()
	const createProfessorUseCase = new CreateProfessorUseCase(professorsRepository)

	const professor = await createProfessorUseCase.execute({ nome });

	if (professor.isLeft())
		return reply
			.status(400)
			.send(professor.value.error)

	return reply
		.status(201)
		.send(professor.value.professor);
}
