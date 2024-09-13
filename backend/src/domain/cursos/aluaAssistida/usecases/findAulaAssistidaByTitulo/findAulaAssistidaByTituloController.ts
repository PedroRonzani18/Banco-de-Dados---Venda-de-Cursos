import { FastifyReply, FastifyRequest } from 'fastify';
import { AulaAssistidasOracleRepository } from '../../repositories/aulaAssistidaOracleRepository';
import { z } from 'zod';
import { FindAulaAssistidaByTituloUseCase } from './findAulaAssistidaByTituloUseCase';

export const createAulaAssistidaBodySchema = z.object({
	idAula: z.number(),
	idUsuario: z.number(),
});

export async function findAulaAssistidaByNomeController(request: FastifyRequest, reply: FastifyReply) {

	try {
		const { idAula, idUsuario } = createAulaAssistidaBodySchema.parse(request.body);

		const aulaAssistidasRepository = new AulaAssistidasOracleRepository()
		const findAulaAssistidaByIdUseCase = new FindAulaAssistidaByTituloUseCase(aulaAssistidasRepository)

		const aulaAssistida = await findAulaAssistidaByIdUseCase.execute({ idAula, idUsuario });

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
