import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { TemasOracleRepository } from '../../repositories/temaOracleRepository';
import { UpdateTemaUseCase } from './updateTemaUseCase';

export const updateTemaParamsSchema = z.object({
	id: z.string(),
});

export const updateTemaBodySchema = z.object({
	nome: z.string().optional(),
});

export async function updateTemaController(request: FastifyRequest, reply: FastifyReply) {

	const { nome } = updateTemaBodySchema.parse(request.body);
	const { id } = updateTemaParamsSchema.parse(request.params);

	const temasRepository = new TemasOracleRepository()
	const updateTemaUseCase = new UpdateTemaUseCase(temasRepository)

	const tema = await updateTemaUseCase.execute({ id, nome });

	if (tema.isLeft())
		return reply
			.status(400)
			.send(tema.value.error)

	return reply
		.status(201)
		.send(tema.value.tema);
}
