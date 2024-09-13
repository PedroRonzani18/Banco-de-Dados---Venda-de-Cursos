import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AulaAssistidasOracleRepository } from '../../repositories/aulaAssistidaOracleRepository';
import { CreateAulaAssistidaUseCase } from './createAulaAssistidaUseCase';

export const createAulaAssistidaBodySchema = z.object({
	idUsuario: z.number(),
	idAula: z.number(),
});

export async function createAulaAssistidaController(request: FastifyRequest, reply: FastifyReply) {

	try {
	const { idAula, idUsuario } = createAulaAssistidaBodySchema.parse(request.body);

	const aulaAssistidasRepository = new AulaAssistidasOracleRepository()
	const createAulaAssistidaUseCase = new CreateAulaAssistidaUseCase(aulaAssistidasRepository)

	const aulaAssistida = await createAulaAssistidaUseCase.execute({ dataAssistir: new Date(), idAula, idUsuario });

	if (aulaAssistida.isLeft())
		return reply
			.status(400)
			.send(aulaAssistida.value.error)

	return reply
		.status(201)
		.send(aulaAssistida.value.aulaAssistida);
} catch (err) {
	console.error(err)
	throw err
}
}
