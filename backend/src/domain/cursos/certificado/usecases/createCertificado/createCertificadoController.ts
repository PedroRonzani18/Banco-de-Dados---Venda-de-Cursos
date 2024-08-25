import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CertificadosOracleRepository } from '../../repositories/certificadoOracleRepository';
import { CreateCertificadoUseCase } from './createCertificadoUseCase';

export const createCertificadoBodySchema = z.object({
	usuarioId: z.number(),
	cursoId: z.number(),
	dataCertificado: z.date(),
});

export async function createCertificadoController(request: FastifyRequest, reply: FastifyReply) {

	const { cursoId, dataCertificado, usuarioId } = createCertificadoBodySchema.parse(request.body);

	const certificadosRepository = new CertificadosOracleRepository()
	const createCertificadoUseCase = new CreateCertificadoUseCase(certificadosRepository)

	const certificado = await createCertificadoUseCase.execute({ cursoId, dataCertificado, usuarioId });

	if (certificado.isLeft())
		return reply
			.status(400)
			.send(certificado.value.error)

	return reply
		.status(201)
		.send(certificado.value.certificado);
}
