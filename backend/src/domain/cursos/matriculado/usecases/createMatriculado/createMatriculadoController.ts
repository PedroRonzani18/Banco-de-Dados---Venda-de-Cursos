import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { MatriculadosOracleRepository } from '../../repositories/matriculadoOracleRepository';
import { CreateMatriculadoUseCase } from './createMatriculadoUseCase';

export const createMatriculadoBodySchema = z.object({
	usuarioId: z.string(),
	cursoId: z.string(),
	dataMatricula: z.date(),
});

export async function createMatriculadoController(request: FastifyRequest, reply: FastifyReply) {

	const { cursoId, dataMatricula, usuarioId } = createMatriculadoBodySchema.parse(request.body);

	const matriculadosRepository = new MatriculadosOracleRepository()
	const createMatriculadoUseCase = new CreateMatriculadoUseCase(matriculadosRepository)

	const matriculado = await createMatriculadoUseCase.execute({ cursoId, dataMatricula, usuarioId });

	if (matriculado.isLeft())
		return reply
			.status(400)
			.send(matriculado.value.error)

	return reply
		.status(201)
		.send(matriculado.value.matriculado);
}
