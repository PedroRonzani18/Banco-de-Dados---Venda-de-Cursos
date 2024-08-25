import { FastifyReply, FastifyRequest } from 'fastify';
import { MatriculadosOracleRepository } from '../../repositories/matriculadoOracleRepository';
import { ListMatriculadosUseCase } from './listMatriculadosUseCase';

export async function listMatriculadosController(request: FastifyRequest, reply: FastifyReply) {

	const matriculadosRepository = new MatriculadosOracleRepository()
    const listMatriculadosUseCase = new ListMatriculadosUseCase(matriculadosRepository)

	const matriculado = await listMatriculadosUseCase.execute();

	if (matriculado.isLeft())
		return reply
			.status(400)
			.send(matriculado.value.error)

	return reply
		.status(201)
		.send(matriculado.value.matriculados);
}
