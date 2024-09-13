import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AulaAssistidasOracleRepository } from '../../repositories/aulaAssistidaOracleRepository';
import { LeftJoinUseCase } from './leftJoinUseCase';

export const leftJoinBodySchema = z.object({
	idUsuario: z.number(),
	idCurso: z.number(),
});

export async function leftJoinController(request: FastifyRequest, reply: FastifyReply) {

	try {

		const { idUsuario, idCurso } = leftJoinBodySchema.parse(request.body);

		const aulaAssistidasRepository = new AulaAssistidasOracleRepository()
		const leftJoinUseCase = new LeftJoinUseCase(aulaAssistidasRepository)

		const aulaAssistida = await leftJoinUseCase.execute({ idUsuario, idCurso });

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
