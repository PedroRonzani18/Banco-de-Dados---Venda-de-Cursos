import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CursosOracleRepository } from '../../repositories/cursoOracleRepository';
import { UpdateCursoUseCase } from './updateCursoUseCase';

export const updateCursoParamsSchema = z.object({
	id: z.string(),
});

export const updateCursoBodySchema = z.object({
	cargaHora: z.number().optional(),
	dataCadastro: z.date().optional(),
	descricao: z.string().optional(),
	nome: z.string().optional(),
	preco: z.number().optional(),
	usuarioId: z.string().optional(),
});

export async function updateCursoController(request: FastifyRequest, reply: FastifyReply) {

	try {
	const data = updateCursoBodySchema.parse(request.body);
	const { id } = updateCursoParamsSchema.parse(request.params);

	const cursosRepository = new CursosOracleRepository()
	const updateCursoUseCase = new UpdateCursoUseCase(cursosRepository)

	const curso = await updateCursoUseCase.execute({ id: Number(id), data });

	if (curso.isLeft())
		return reply
			.status(400)
			.send(curso.value.error)

	return reply
		.status(201)
		.send(curso.value.curso);
} catch (error) {
	console.dir(error, { depth: null });
	throw error;
}
}
