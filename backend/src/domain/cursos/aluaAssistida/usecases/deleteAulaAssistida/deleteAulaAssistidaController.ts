import { FastifyReply, FastifyRequest } from 'fastify';
import { AulaAssistidasOracleRepository } from '../../repositories/aulaAssistidaOracleRepository';
import { DeleteAulaAssistidaUseCase } from './deleteAulaAssistidaUseCase';
import { z } from 'zod';

export const createAulaAssistidaBodySchema = z.object({
	id: z.number(),
});

export async function deleteAulaAssistidaController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createAulaAssistidaBodySchema.parse(request.params);

	const aulaAssistidasRepository = new AulaAssistidasOracleRepository()
	const deleteAulaAssistidaUseCase = new DeleteAulaAssistidaUseCase(aulaAssistidasRepository)
	const aulaAssistida = await deleteAulaAssistidaUseCase.execute({ id });

	if (aulaAssistida.isLeft())
		return reply
			.status(400)
			.send(aulaAssistida.value.error)

	return reply
		.status(201)
		.send(aulaAssistida.value.aulaAssistida);
}
