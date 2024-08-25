import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AulaAssistidasOracleRepository } from '../../repositories/aulaAssistidaOracleRepository';
import { UpdateAulaAssistidaUseCase } from './updateAulaAssistidaUseCase';

export const updateAulaAssistidaParamsSchema = z.object({
	id: z.number(),
});

export const updateAulaAssistidaBodySchema = z.object({
	dataAssistir: z.date(),
	idUsuario: z.number(),
	idAula: z.number(),
});

export async function updateAulaAssistidaController(request: FastifyRequest, reply: FastifyReply) {

	const data = updateAulaAssistidaBodySchema.parse(request.body);
	const { id } = updateAulaAssistidaParamsSchema.parse(request.params);

	const aulaAssistidasRepository = new AulaAssistidasOracleRepository()
	const updateAulaAssistidaUseCase = new UpdateAulaAssistidaUseCase(aulaAssistidasRepository)

	const aulaAssistida = await updateAulaAssistidaUseCase.execute({ id, data });

	if (aulaAssistida.isLeft())
		return reply
			.status(400)
			.send(aulaAssistida.value.error)

	return reply
		.status(201)
		.send(aulaAssistida.value.aulaAssistida);
}
