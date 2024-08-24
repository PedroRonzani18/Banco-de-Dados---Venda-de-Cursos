import { FastifyReply, FastifyRequest } from 'fastify';
import { CursosOracleRepository } from '../../repositories/cursoOracleRepository';
import { DeleteCursoUseCase } from './deleteCursoUseCase';
import { z } from 'zod';

export const createCursoBodySchema = z.object({
	id: z.string(),
});

export async function deleteCursoController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createCursoBodySchema.parse(request.params);

	const cursosRepository = new CursosOracleRepository()
	const deleteCursoUseCase = new DeleteCursoUseCase(cursosRepository)
	const curso = await deleteCursoUseCase.execute({ id });

	if (curso.isLeft())
		return reply
			.status(400)
			.send(curso.value.error)

	return reply
		.status(201)
		.send(curso.value.curso);
}
