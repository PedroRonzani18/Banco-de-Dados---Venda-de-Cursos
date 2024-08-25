import { FastifyReply, FastifyRequest } from 'fastify';
import { AlternativasOracleRepository } from '../../repositories/alternativaOracleRepository';
import { ListAlternativasUseCase } from './listAlternativasUseCase';

export async function listAlternativasController(request: FastifyRequest, reply: FastifyReply) {

	const alternativasRepository = new AlternativasOracleRepository()
    const listAlternativasUseCase = new ListAlternativasUseCase(alternativasRepository)

	const alternativa = await listAlternativasUseCase.execute();

	if (alternativa.isLeft())
		return reply
			.status(400)
			.send(alternativa.value.error)

	return reply
		.status(201)
		.send(alternativa.value.alternativas);
}
