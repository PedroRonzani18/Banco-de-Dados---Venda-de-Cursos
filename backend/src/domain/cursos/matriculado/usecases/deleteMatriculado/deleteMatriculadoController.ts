import { FastifyReply, FastifyRequest } from 'fastify';
import { MatriculadosOracleRepository } from '../../repositories/matriculadoOracleRepository';
import { DeleteMatriculadoUseCase } from './deleteMatriculadoUseCase';
import { z } from 'zod';

export const createMatriculadoBodySchema = z.object({
	id: z.string(),
});

export async function deleteMatriculadoController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createMatriculadoBodySchema.parse(request.params);

	const matriculadosRepository = new MatriculadosOracleRepository()
	const deleteMatriculadoUseCase = new DeleteMatriculadoUseCase(matriculadosRepository)
	const matriculado = await deleteMatriculadoUseCase.execute({ id });

	if (matriculado.isLeft())
		return reply
			.status(400)
			.send(matriculado.value.error)

	return reply
		.status(201)
		.send(matriculado.value.matriculado);
}
