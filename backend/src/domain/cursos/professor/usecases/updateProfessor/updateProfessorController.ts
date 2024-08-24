import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ProfessorsOracleRepository } from '../../repositories/professorOracleRepository';
import { UpdateProfessorUseCase } from './updateProfessorUseCase';

export const updateProfessorParamsSchema = z.object({
	id: z.string(),
});

export const updateProfessorBodySchema = z.object({
	nome: z.string().optional(),
});

export async function updateProfessorController(request: FastifyRequest, reply: FastifyReply) {

	const { nome } = updateProfessorBodySchema.parse(request.body);
	const { id } = updateProfessorParamsSchema.parse(request.params);

	const professorsRepository = new ProfessorsOracleRepository()
	const updateProfessorUseCase = new UpdateProfessorUseCase(professorsRepository)

	const professor = await updateProfessorUseCase.execute({ id, nome });

	if (professor.isLeft())
		return reply
			.status(400)
			.send(professor.value.error)

	return reply
		.status(201)
		.send(professor.value.professor);
}
