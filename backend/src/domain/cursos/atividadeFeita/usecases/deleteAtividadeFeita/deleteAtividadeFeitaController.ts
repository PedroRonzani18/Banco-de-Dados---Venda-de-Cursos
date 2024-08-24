import { FastifyReply, FastifyRequest } from 'fastify';
import { AtividadeFeitasOracleRepository } from '../../repositories/atividadeFeitaOracleRepository';
import { DeleteAtividadeFeitaUseCase } from './deleteAtividadeFeitaUseCase';
import { z } from 'zod';

export const createAtividadeFeitaBodySchema = z.object({
	id: z.string(),
});

export async function deleteAtividadeFeitaController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createAtividadeFeitaBodySchema.parse(request.params);

	const atividadeFeitasRepository = new AtividadeFeitasOracleRepository()
	const deleteAtividadeFeitaUseCase = new DeleteAtividadeFeitaUseCase(atividadeFeitasRepository)
	const atividadeFeita = await deleteAtividadeFeitaUseCase.execute({ id });

	if (atividadeFeita.isLeft())
		return reply
			.status(400)
			.send(atividadeFeita.value.error)

	return reply
		.status(201)
		.send(atividadeFeita.value.atividadeFeita);
}
