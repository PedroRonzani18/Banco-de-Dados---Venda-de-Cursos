import { FastifyReply, FastifyRequest } from 'fastify';
import { AtividadesOracleRepository } from '../../repositories/atividadeOracleRepository';
import { z } from 'zod';
import { FindAtividadeByTituloUseCase } from './findAtividadeByTituloUseCase';

export const createAtividadeBodySchema = z.object({
	idAula: z.number(),
	titulo: z.string(),
});

export async function findAtividadeByTituloController(request: FastifyRequest, reply: FastifyReply) {

    const { idAula, titulo } = createAtividadeBodySchema.parse(request.body);

	const atividadesRepository = new AtividadesOracleRepository()
    const findAtividadeByIdUseCase = new FindAtividadeByTituloUseCase(atividadesRepository)

	const atividade = await findAtividadeByIdUseCase.execute({ idAula, titulo });

	if (atividade.isLeft())
		return reply
			.status(400)
			.send(atividade.value.error)

	return reply
		.status(201)
		.send(atividade.value.atividade);
}
