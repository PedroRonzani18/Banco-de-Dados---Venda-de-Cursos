import { FastifyReply, FastifyRequest } from 'fastify';
import { CursosOracleRepository } from '../../repositories/cursoOracleRepository';
import { ListCoursesEnrolledToUserUseCase } from './listCoursesEnrolledToUserUseCase';
import { z } from 'zod';

const idSchema = z.object({
	userid: z.string()
});

export async function listCoursesEnrolledToUserController(request: FastifyRequest, reply: FastifyReply) {

	const { userid } = idSchema.parse(request.params);

	const cursosRepository = new CursosOracleRepository()
    const listCursosUseCase = new ListCoursesEnrolledToUserUseCase(cursosRepository)

	const curso = await listCursosUseCase.execute({ userid: Number(userid) });

	if (curso.isLeft())
		return reply
			.status(400)
			.send(curso.value.error)

	return reply
		.status(201)
		.send(curso.value.cursos);
}
