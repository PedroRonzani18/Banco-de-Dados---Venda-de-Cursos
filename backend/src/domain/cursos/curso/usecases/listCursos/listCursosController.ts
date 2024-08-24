import { FastifyReply, FastifyRequest } from 'fastify';
import { CursosOracleRepository } from '../../repositories/cursoOracleRepository';
import { ListCursosUseCase } from './listCursosUseCase';

export async function listCursosController(request: FastifyRequest, reply: FastifyReply) {

	const cursosRepository = new CursosOracleRepository()
    const listCursosUseCase = new ListCursosUseCase(cursosRepository)

	const curso = await listCursosUseCase.execute();

	if (curso.isLeft())
		return reply
			.status(400)
			.send(curso.value.error)

	return reply
		.status(201)
		.send(curso.value.cursos);
}
