import { FastifyReply, FastifyRequest } from 'fastify';
import { TemasOracleRepository } from '../../repositories/temaOracleRepository';
import { z } from 'zod';
import { FindTemaByNomeUseCase } from './findTemaByNomeUseCase';

export const createTemaBodySchema = z.object({
	nome: z.string(),
});

export async function findTemaByNomeController(request: FastifyRequest, reply: FastifyReply) {

    const { nome } = createTemaBodySchema.parse(request.body);

	const temasRepository = new TemasOracleRepository()
    const findTemaByIdUseCase = new FindTemaByNomeUseCase(temasRepository)

	const tema = await findTemaByIdUseCase.execute({ nome });

	if (tema.isLeft())
		return reply
			.status(400)
			.send(tema.value.error)

	return reply
		.status(201)
		.send(tema.value.tema);
}
