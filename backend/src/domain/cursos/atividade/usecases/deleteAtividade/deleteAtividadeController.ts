import { FastifyReply, FastifyRequest } from 'fastify';
import { AtividadesOracleRepository } from '../../repositories/atividadeOracleRepository';
import { DeleteAtividadeUseCase } from './deleteAtividadeUseCase';
import { z } from 'zod';

export const createAtividadeBodySchema = z.object({
	id: z.string(),
});

export async function deleteAtividadeController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createAtividadeBodySchema.parse(request.params);

	const atividadesRepository = new AtividadesOracleRepository()
	const deleteAtividadeUseCase = new DeleteAtividadeUseCase(atividadesRepository)
	const atividade = await deleteAtividadeUseCase.execute({ id });

	if (atividade.isLeft())
		return reply
			.status(400)
			.send(atividade.value.error)

	return reply
		.status(201)
		.send(atividade.value.atividade);
}
