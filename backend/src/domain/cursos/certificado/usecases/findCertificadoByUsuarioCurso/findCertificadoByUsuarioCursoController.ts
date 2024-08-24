import { FastifyReply, FastifyRequest } from 'fastify';
import { CertificadosOracleRepository } from '../../repositories/certificadoOracleRepository';
import { z } from 'zod';
import { FindCertificadoByUsuarioCursoUseCase } from './findCertificadoByUsuarioCursoUseCase';

export const createCertificadoBodySchema = z.object({
	cursoId: z.string(),
	usuarioId: z.string(),
});

export async function findCertificadoByTituloController(request: FastifyRequest, reply: FastifyReply) {

	const { cursoId, usuarioId } = createCertificadoBodySchema.parse(request.body);

	const certificadosRepository = new CertificadosOracleRepository()
	const findCertificadoByIdUseCase = new FindCertificadoByUsuarioCursoUseCase(certificadosRepository)

	const certificado = await findCertificadoByIdUseCase.execute({ cursoId, usuarioId });

	if (certificado.isLeft())
		return reply
			.status(400)
			.send(certificado.value.error)

	return reply
		.status(201)
		.send(certificado.value.certificado);
}
