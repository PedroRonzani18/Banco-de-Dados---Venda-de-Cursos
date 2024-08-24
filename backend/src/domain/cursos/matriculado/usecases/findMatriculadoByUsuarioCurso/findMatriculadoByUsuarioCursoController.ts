import { FastifyReply, FastifyRequest } from 'fastify';
import { MatriculadosOracleRepository } from '../../repositories/matriculadoOracleRepository';
import { z } from 'zod';
import { FindMatriculadoByUsuarioCursoUseCase } from './findMatriculadoByUsuarioCursoUseCase';

export const createMatriculadoBodySchema = z.object({
	cursoId: z.number(),
	usuarioId: z.number(),
});

export async function findMatriculadoByTituloController(request: FastifyRequest, reply: FastifyReply) {

	const { cursoId, usuarioId } = createMatriculadoBodySchema.parse(request.body);

	const matriculadosRepository = new MatriculadosOracleRepository()
	const findMatriculadoByIdUseCase = new FindMatriculadoByUsuarioCursoUseCase(matriculadosRepository)

	const matriculado = await findMatriculadoByIdUseCase.execute({ cursoId, usuarioId });

	if (matriculado.isLeft())
		return reply
			.status(400)
			.send(matriculado.value.error)

	return reply
		.status(201)
		.send(matriculado.value.matriculado);
}
