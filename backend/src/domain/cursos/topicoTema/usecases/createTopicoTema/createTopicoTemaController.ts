import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { TopicoTemasOracleRepository } from '../../repositories/topicoTemaOracleRepository';
import { CreateTopicoTemaUseCase } from './createTopicoTemaUseCase';

export const createTopicoTemaBodySchema = z.object({
	idTema: z.number(),
	idTopico: z.number(),
});

export async function createTopicoTemaController(request: FastifyRequest, reply: FastifyReply) {

	try {

		const { idTema, idTopico } = createTopicoTemaBodySchema.parse(request.body);

		const topicoTemasRepository = new TopicoTemasOracleRepository()
		const createTopicoTemaUseCase = new CreateTopicoTemaUseCase(topicoTemasRepository)

		const topicoTema = await createTopicoTemaUseCase.execute({ idTema, idTopico });

		if (topicoTema.isLeft())
			return reply
				.status(400)
				.send(topicoTema.value.error)

		return reply
			.status(201)
			.send(topicoTema.value.topicoTema);
	} catch (error) {
		console.dir(error, { depth: null });
		throw error;
	}
}
