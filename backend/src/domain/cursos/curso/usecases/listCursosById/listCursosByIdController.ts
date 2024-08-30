import { FastifyReply, FastifyRequest } from 'fastify';
import { CursosOracleRepository } from '../../repositories/cursoOracleRepository';
import { ListCursosByIdUseCase } from './listCursosByIdUseCase';
import { z } from 'zod';

const idSchema = z.object({
	id: z.string()
});

export async function listCursosByIdController(request: FastifyRequest, reply: FastifyReply) {

	const { id } = idSchema.parse(request.params);

	const cursosRepository = new CursosOracleRepository()
    const listCursosUseCase = new ListCursosByIdUseCase(cursosRepository)

	const curso = await listCursosUseCase.execute({ id: Number(id) });

	if (curso.isLeft())
		return reply
			.status(400)
			.send(curso.value.error)

	return reply
		.status(201)
		.send(curso.value.cursos);
}
