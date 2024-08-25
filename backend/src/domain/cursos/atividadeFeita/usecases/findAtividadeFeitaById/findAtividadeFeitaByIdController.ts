import { FastifyReply, FastifyRequest } from 'fastify';
import { AtividadeFeitasOracleRepository } from '../../repositories/atividadeFeitaOracleRepository';
import { FindAtividadeFeitaByIdUseCase } from './findAtividadeFeitaByIdUseCase';
import { z } from 'zod';

export const createAtividadeFeitaBodySchema = z.object({
	id: z.number(),
});

export async function findAtividadeFeitaByIdController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createAtividadeFeitaBodySchema.parse(request.params);

	const atividadeFeitasRepository = new AtividadeFeitasOracleRepository()
    const findAtividadeFeitaByIdUseCase = new FindAtividadeFeitaByIdUseCase(atividadeFeitasRepository)

	const atividadeFeita = await findAtividadeFeitaByIdUseCase.execute({ id });

	if (atividadeFeita.isLeft())
		return reply
			.status(400)
			.send(atividadeFeita.value.error)

	return reply
		.status(201)
		.send(atividadeFeita.value.atividadeFeita);
}
