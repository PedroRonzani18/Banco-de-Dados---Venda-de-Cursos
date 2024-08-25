import { FastifyReply, FastifyRequest } from 'fastify';
import { CursosOracleRepository } from '../../repositories/cursoOracleRepository';
import { z } from 'zod';
import { FindCursoByNomeUseCase } from './findCursoByNomeUseCase';

export const createCursoBodySchema = z.object({
	nome: z.string(),
});

export async function findCursoByNomeController(request: FastifyRequest, reply: FastifyReply) {

    const { nome } = createCursoBodySchema.parse(request.body);

	const cursosRepository = new CursosOracleRepository()
    const findCursoByNomeUseCase = new FindCursoByNomeUseCase(cursosRepository)

	const curso = await findCursoByNomeUseCase.execute({ nome });

	if (curso.isLeft())
		return reply
			.status(400)
			.send(curso.value.error)

	return reply
		.status(201)
		.send(curso.value.curso);
}
