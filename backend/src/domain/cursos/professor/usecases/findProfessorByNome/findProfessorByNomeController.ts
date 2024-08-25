import { FastifyReply, FastifyRequest } from 'fastify';
import { ProfessorsOracleRepository } from '../../repositories/professorOracleRepository';
import { z } from 'zod';
import { FindProfessorByNomeUseCase } from './findProfessorByNomeUseCase';

export const createProfessorBodySchema = z.object({
	nome: z.string(),
});

export async function findProfessorByNomeController(request: FastifyRequest, reply: FastifyReply) {

    const { nome } = createProfessorBodySchema.parse(request.body);

	const professorsRepository = new ProfessorsOracleRepository()
    const findProfessorByIdUseCase = new FindProfessorByNomeUseCase(professorsRepository)

	const professor = await findProfessorByIdUseCase.execute({ nome });

	if (professor.isLeft())
		return reply
			.status(400)
			.send(professor.value.error)

	return reply
		.status(201)
		.send(professor.value.professor);
}
