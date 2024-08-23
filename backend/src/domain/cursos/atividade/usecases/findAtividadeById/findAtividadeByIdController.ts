import { FastifyReply, FastifyRequest } from 'fastify';
import { AtividadesOracleRepository } from '../../repositories/atividadeOracleRepository';
import { FindAtividadeByIdUseCase } from './findAtividadeByIdUseCase';
import { z } from 'zod';

export const createAtividadeBodySchema = z.object({
	id: z.string(),
});

export async function findAtividadeByIdController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createAtividadeBodySchema.parse(request.params);

	const atividadesRepository = new AtividadesOracleRepository()
    const findAtividadeByIdUseCase = new FindAtividadeByIdUseCase(atividadesRepository)

	const atividade = await findAtividadeByIdUseCase.execute({ id });

	if (atividade.isLeft())
		return reply
			.status(400)
			.send(atividade.value.error)

	return reply
		.status(201)
		.send(atividade.value.atividade);
}
