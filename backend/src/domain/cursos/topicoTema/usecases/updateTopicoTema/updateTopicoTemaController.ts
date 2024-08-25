import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { TopicoTemasOracleRepository } from '../../repositories/topicoTemaOracleRepository';
import { UpdateTopicoTemaUseCase } from './updateTopicoTemaUseCase';

export const updateTopicoTemaParamsSchema = z.object({
	id: z.number(),
});

export const updateTopicoTemaBodySchema = z.object({
	idTema: z.number().optional(),
	idTopico: z.number().optional(),
});

export async function updateTopicoTemaController(request: FastifyRequest, reply: FastifyReply) {

	const data = updateTopicoTemaBodySchema.parse(request.body);
	const { id } = updateTopicoTemaParamsSchema.parse(request.params);

	const topicoTemasRepository = new TopicoTemasOracleRepository()
	const updateTopicoTemaUseCase = new UpdateTopicoTemaUseCase(topicoTemasRepository)

	const topicoTema = await updateTopicoTemaUseCase.execute({ id, data });

	if (topicoTema.isLeft())
		return reply
			.status(400)
			.send(topicoTema.value.error)

	return reply
		.status(201)
		.send(topicoTema.value.topicoTema);
}
