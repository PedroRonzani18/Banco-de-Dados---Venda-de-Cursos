import { FastifyReply, FastifyRequest } from 'fastify';
import { AulaAssistidasOracleRepository } from '../../repositories/aulaAssistidaOracleRepository';
import { ListAulaAssistidasUseCase } from './listAulaAssistidasUseCase';

export async function listAulaAssistidasController(request: FastifyRequest, reply: FastifyReply) {

	const aulaAssistidasRepository = new AulaAssistidasOracleRepository()
    const listAulaAssistidasUseCase = new ListAulaAssistidasUseCase(aulaAssistidasRepository)

	const aulaAssistida = await listAulaAssistidasUseCase.execute();

	if (aulaAssistida.isLeft())
		return reply
			.status(400)
			.send(aulaAssistida.value.error)

	return reply
		.status(201)
		.send(aulaAssistida.value.aulaAssistidas);
}
