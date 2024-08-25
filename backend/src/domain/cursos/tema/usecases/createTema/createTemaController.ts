import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { TemasOracleRepository } from '../../repositories/temaOracleRepository';
import { CreateTemaUseCase } from './createTemaUseCase';

export const createTemaBodySchema = z.object({
	nome: z.string(),
});

export async function createTemaController(request: FastifyRequest, reply: FastifyReply) {

	const { nome } = createTemaBodySchema.parse(request.body);

	const temasRepository = new TemasOracleRepository()
	const createTemaUseCase = new CreateTemaUseCase(temasRepository)

	const tema = await createTemaUseCase.execute({ nome });

	if (tema.isLeft())
		return reply
			.status(400)
			.send(tema.value.error)

	return reply
		.status(201)
		.send(tema.value.tema);
}
