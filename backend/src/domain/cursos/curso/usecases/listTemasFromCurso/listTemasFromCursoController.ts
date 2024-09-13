import { FastifyReply, FastifyRequest } from 'fastify';
import { CursosOracleRepository } from '../../repositories/cursoOracleRepository';
import { ListTemasFromCursoUseCase } from './listTemasFromCursoUseCase';
import { z } from 'zod';

const idSchema = z.object({
	id: z.string()
});

export async function listTemasFromCursoController(request: FastifyRequest, reply: FastifyReply) {

	console.log("oaishdjisad")
	const { id } = idSchema.parse(request.params);


	const cursosRepository = new CursosOracleRepository()
    const listCursosUseCase = new ListTemasFromCursoUseCase(cursosRepository)

	const curso = await listCursosUseCase.execute({ id: Number(id) });

	if (curso.isLeft())
		return reply
			.status(400)
			.send(curso.value.error)

	return reply
		.status(201)
		.send(curso.value.temas);
}
