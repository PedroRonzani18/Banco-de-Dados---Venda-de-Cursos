import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AulasOracleRepository } from '../../repositories/aulaOracleRepository';
import { CreateAulaUseCase } from './createAulaUseCase';

export const createAulaBodySchema = z.object({
	idTopico: z.string(),
	titulo: z.string(),
	descricao: z.string(),
	urlVideo: z.string().optional(),
	duracaoEstimada: z.number(),
});

export async function createAulaController(request: FastifyRequest, reply: FastifyReply) {

	const { descricao, duracaoEstimada, idTopico, titulo, urlVideo } = createAulaBodySchema.parse(request.body);

	const aulasRepository = new AulasOracleRepository()
	const createAulaUseCase = new CreateAulaUseCase(aulasRepository)

	const aula = await createAulaUseCase.execute({ descricao, duracaoEstimada, idTopico, titulo, urlVideo });

	if (aula.isLeft())
		return reply
			.status(400)
			.send(aula.value.error)

	return reply
		.status(201)
		.send(aula.value.aula);
}
