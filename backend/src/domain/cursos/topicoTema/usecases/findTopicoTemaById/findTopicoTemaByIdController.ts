import { FastifyReply, FastifyRequest } from 'fastify';
import { TopicoTemasOracleRepository } from '../../repositories/topicoTemaOracleRepository';
import { FindTopicoTemaByIdUseCase } from './findTopicoTemaByIdUseCase';
import { z } from 'zod';

export const createTopicoTemaBodySchema = z.object({
	id: z.number(),
});

export async function findTopicoTemaByIdController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createTopicoTemaBodySchema.parse(request.params);

	const topicoTemasRepository = new TopicoTemasOracleRepository()
    const findTopicoTemaByIdUseCase = new FindTopicoTemaByIdUseCase(topicoTemasRepository)

	const topicoTema = await findTopicoTemaByIdUseCase.execute({ id });

	if (topicoTema.isLeft())
		return reply
			.status(400)
			.send(topicoTema.value.error)

	return reply
		.status(201)
		.send(topicoTema.value.topicoTema);
}
