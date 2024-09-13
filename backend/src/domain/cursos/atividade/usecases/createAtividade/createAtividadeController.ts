import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AtividadesOracleRepository } from '../../repositories/atividadeOracleRepository';
import { CreateAtividadeUseCase } from './createAtividadeUseCase';

export const createAtividadeBodySchema = z.object({
	idAula: z.number(),
	enunciado: z.string(),
	titulo: z.string(),
});

export async function createAtividadeController(request: FastifyRequest, reply: FastifyReply) {

	try {
		const { idAula, enunciado, titulo } = createAtividadeBodySchema.parse(request.body);

		const atividadesRepository = new AtividadesOracleRepository()
		const createAtividadeUseCase = new CreateAtividadeUseCase(atividadesRepository)

		const atividade = await createAtividadeUseCase.execute({ enunciado, idAula, titulo });

		if (atividade.isLeft())
			return reply
				.status(400)
				.send(atividade.value.error)

		return reply
			.status(201)
			.send(atividade.value.atividade);
	} catch (error) {
		console.error(error)
		throw error
	}
}
