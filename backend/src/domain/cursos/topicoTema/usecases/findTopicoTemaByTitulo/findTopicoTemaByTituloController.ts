import { FastifyReply, FastifyRequest } from 'fastify';
import { TopicoTemasOracleRepository } from '../../repositories/topicoTemaOracleRepository';
import { z } from 'zod';
import { FindTopicoTemaByTituloUseCase } from './findTopicoTemaByTituloUseCase';

export const createTopicoTemaBodySchema = z.object({
	idTema: z.number(),
	idTopico: z.number(),
});

export async function findTopicoTemaByNomeController(request: FastifyRequest, reply: FastifyReply) {

    const { idTema, idTopico } = createTopicoTemaBodySchema.parse(request.body);

	const topicoTemasRepository = new TopicoTemasOracleRepository()
    const findTopicoTemaByIdUseCase = new FindTopicoTemaByTituloUseCase(topicoTemasRepository)

	const topicoTema = await findTopicoTemaByIdUseCase.execute({ idTema, idTopico });

	if (topicoTema.isLeft())
		return reply
			.status(400)
			.send(topicoTema.value.error)

	return reply
		.status(201)
		.send(topicoTema.value.topicoTema);
}
