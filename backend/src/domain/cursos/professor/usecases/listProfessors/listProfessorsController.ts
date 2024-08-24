import { FastifyReply, FastifyRequest } from 'fastify';
import { ProfessorsOracleRepository } from '../../repositories/professorOracleRepository';
import { ListProfessorsUseCase } from './listProfessorsUseCase';

export async function listProfessorsController(request: FastifyRequest, reply: FastifyReply) {

	const professorsRepository = new ProfessorsOracleRepository()
    const listProfessorsUseCase = new ListProfessorsUseCase(professorsRepository)

	const professor = await listProfessorsUseCase.execute();

	if (professor.isLeft())
		return reply
			.status(400)
			.send(professor.value.error)

	return reply
		.status(201)
		.send(professor.value.professors);
}
