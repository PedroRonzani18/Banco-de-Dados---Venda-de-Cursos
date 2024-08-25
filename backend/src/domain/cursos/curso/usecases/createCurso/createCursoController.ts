import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CursosOracleRepository } from '../../repositories/cursoOracleRepository';
import { CreateCursoUseCase } from './createCursoUseCase';
import { UsersOracleRepository } from '@/domain/users/user/repositories/userOracleRepository';

export const createCursoBodySchema = z.object({
	usuarioId: z.number(),
	nome: z.string(),
	descricao: z.string(),
	cargaHora: z.number(),
	preco: z.number(),
});

export async function createCursoController(request: FastifyRequest, reply: FastifyReply) {

	const { usuarioId, cargaHora, descricao, nome, preco } = createCursoBodySchema.parse(request.body);

	const cursosRepository = new CursosOracleRepository()
	const usersRepository = new UsersOracleRepository()
	const createCursoUseCase = new CreateCursoUseCase(cursosRepository, usersRepository)

	const curso = await createCursoUseCase.execute({ usuarioId, cargaHora, descricao, nome, preco });

	if (curso.isLeft())
		return reply
			.status(400)
			.send(curso.value.error)

	return reply
		.status(201)
		.send(curso.value.curso);
}
