import { FastifyReply, FastifyRequest } from 'fastify';
import { TemasOracleRepository } from '../../repositories/temaOracleRepository';
import { DeleteTemaUseCase } from './deleteTemaUseCase';
import { z } from 'zod';

export const createTemaBodySchema = z.object({
	id: z.string(),
});

export async function deleteTemaController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createTemaBodySchema.parse(request.params);

	const temasRepository = new TemasOracleRepository()
	const deleteTemaUseCase = new DeleteTemaUseCase(temasRepository)
	const tema = await deleteTemaUseCase.execute({ id });

	if (tema.isLeft())
		return reply
			.status(400)
			.send(tema.value.error)

	return reply
		.status(201)
		.send(tema.value.tema);
}
