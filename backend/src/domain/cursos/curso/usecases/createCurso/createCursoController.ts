import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CursosOracleRepository } from '../../repositories/cursoOracleRepository';
import { CreateCursoUseCase } from './createCursoUseCase';

export const createCursoBodySchema = z.object({
	nome: z.string(),
	descricao: z.string(),
	cargaHora: z.number(),
	dataCadastro: z.date(),
	preco: z.number(),
});

export async function createCursoController(request: FastifyRequest, reply: FastifyReply) {

	const { cargaHora, dataCadastro, descricao, nome, preco } = createCursoBodySchema.parse(request.body);

	const cursosRepository = new CursosOracleRepository()
	const createCursoUseCase = new CreateCursoUseCase(cursosRepository)

	const curso = await createCursoUseCase.execute({ cargaHora, dataCadastro, descricao, nome, preco });

	if (curso.isLeft())
		return reply
			.status(400)
			.send(curso.value.error)

	return reply
		.status(201)
		.send(curso.value.curso);
}
