import { FastifyReply, FastifyRequest } from 'fastify';
import { AulasOracleRepository } from '../../repositories/aulaOracleRepository';
import { ListAulasUseCase } from './listAulasUseCase';

export async function listAulasController(request: FastifyRequest, reply: FastifyReply) {

	const aulasRepository = new AulasOracleRepository()
    const listAulasUseCase = new ListAulasUseCase(aulasRepository)

	const aula = await listAulasUseCase.execute();

	if (aula.isLeft())
		return reply
			.status(400)
			.send(aula.value.error)

	return reply
		.status(201)
		.send(aula.value.aulas);
}
