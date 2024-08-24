import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CursosOracleRepository } from '../../repositories/cursoOracleRepository';
import { CreateCursoUseCase } from './createCursoUseCase';
import { UsersOracleRepository } from '@/domain/users/user/repositories/userOracleRepository';

export const createCursoBodySchema = z.object({
	donoId: z.string(),
	nome: z.string(),
	descricao: z.string(),
	cargaHora: z.number(),
	dataCadastro: z.date(),
	preco: z.number(),
});

export async function createCursoController(request: FastifyRequest, reply: FastifyReply) {

	const { donoId, cargaHora, dataCadastro, descricao, nome, preco } = createCursoBodySchema.parse(request.body);

	const cursosRepository = new CursosOracleRepository()
	const usersRepository = new UsersOracleRepository()
	const createCursoUseCase = new CreateCursoUseCase(cursosRepository, usersRepository)

	const curso = await createCursoUseCase.execute({ donoId, cargaHora, dataCadastro, descricao, nome, preco });

	if (curso.isLeft())
		return reply
			.status(400)
			.send(curso.value.error)

	return reply
		.status(201)
		.send(curso.value.curso);
}
