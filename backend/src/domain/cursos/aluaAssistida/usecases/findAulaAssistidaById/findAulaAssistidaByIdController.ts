import { FastifyReply, FastifyRequest } from 'fastify';
import { AulaAssistidasOracleRepository } from '../../repositories/aulaAssistidaOracleRepository';
import { FindAulaAssistidaByIdUseCase } from './findAulaAssistidaByIdUseCase';
import { z } from 'zod';

export const createAulaAssistidaBodySchema = z.object({
	id: z.number(),
});

export async function findAulaAssistidaByIdController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createAulaAssistidaBodySchema.parse(request.params);

	const aulaAssistidasRepository = new AulaAssistidasOracleRepository()
    const findAulaAssistidaByIdUseCase = new FindAulaAssistidaByIdUseCase(aulaAssistidasRepository)

	const aulaAssistida = await findAulaAssistidaByIdUseCase.execute({ id });

	if (aulaAssistida.isLeft())
		return reply
			.status(400)
			.send(aulaAssistida.value.error)

	return reply
		.status(201)
		.send(aulaAssistida.value.aulaAssistida);
}
