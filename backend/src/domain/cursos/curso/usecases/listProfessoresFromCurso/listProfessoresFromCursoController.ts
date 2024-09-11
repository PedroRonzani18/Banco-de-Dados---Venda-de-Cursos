import { FastifyReply, FastifyRequest } from 'fastify';
import { CursosOracleRepository } from '../../repositories/cursoOracleRepository';
import { ListProfessoresFromCursoUseCase } from './listProfessoresFromCursoUseCase';
import { z } from 'zod';

const idSchema = z.object({
	id: z.string()
});

export async function listProfessoresFromCursoController(request: FastifyRequest, reply: FastifyReply) {

	const { id } = idSchema.parse(request.params);

	const cursosRepository = new CursosOracleRepository()
    const listCursosUseCase = new ListProfessoresFromCursoUseCase(cursosRepository)

	const curso = await listCursosUseCase.execute({ id: Number(id) });

	if (curso.isLeft())
		return reply
			.status(400)
			.send(curso.value.error)

	return reply
		.status(201)
		.send(curso.value.professores);
}
