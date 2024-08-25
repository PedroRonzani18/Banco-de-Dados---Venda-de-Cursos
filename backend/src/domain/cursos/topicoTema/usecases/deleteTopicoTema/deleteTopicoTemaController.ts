import { FastifyReply, FastifyRequest } from 'fastify';
import { TopicoTemasOracleRepository } from '../../repositories/topicoTemaOracleRepository';
import { DeleteTopicoTemaUseCase } from './deleteTopicoTemaUseCase';
import { z } from 'zod';

export const createTopicoTemaBodySchema = z.object({
	id: z.number(),
});

export async function deleteTopicoTemaController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createTopicoTemaBodySchema.parse(request.params);

	const topicoTemasRepository = new TopicoTemasOracleRepository()
	const deleteTopicoTemaUseCase = new DeleteTopicoTemaUseCase(topicoTemasRepository)
	const topicoTema = await deleteTopicoTemaUseCase.execute({ id });

	if (topicoTema.isLeft())
		return reply
			.status(400)
			.send(topicoTema.value.error)

	return reply
		.status(201)
		.send(topicoTema.value.topicoTema);
}
