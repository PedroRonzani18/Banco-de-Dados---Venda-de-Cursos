import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { MatriculadosOracleRepository } from '../../repositories/matriculadoOracleRepository';
import { UpdateMatriculadoUseCase } from './updateMatriculadoUseCase';

export const updateMatriculadoParamsSchema = z.object({
	id: z.number(),
});

export const updateMatriculadoBodySchema = z.object({
	usuarioId: z.number().optional(),
	cursoId: z.number().optional(),
	dataMatricula: z.string().optional(),
});

export async function updateMatriculadoController(request: FastifyRequest, reply: FastifyReply) {

	const data = updateMatriculadoBodySchema.parse(request.body);
	const { id } = updateMatriculadoParamsSchema.parse(request.params);

	const matriculadosRepository = new MatriculadosOracleRepository()
	const updateMatriculadoUseCase = new UpdateMatriculadoUseCase(matriculadosRepository)

	const matriculado = await updateMatriculadoUseCase.execute({ id, data });

	if (matriculado.isLeft())
		return reply
			.status(400)
			.send(matriculado.value.error)

	return reply
		.status(201)
		.send(matriculado.value.matriculado);
}
