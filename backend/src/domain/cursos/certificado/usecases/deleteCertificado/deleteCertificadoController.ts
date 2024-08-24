import { FastifyReply, FastifyRequest } from 'fastify';
import { CertificadosOracleRepository } from '../../repositories/certificadoOracleRepository';
import { DeleteCertificadoUseCase } from './deleteCertificadoUseCase';
import { z } from 'zod';

export const createCertificadoBodySchema = z.object({
	id: z.number(),
});

export async function deleteCertificadoController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createCertificadoBodySchema.parse(request.params);

	const certificadosRepository = new CertificadosOracleRepository()
	const deleteCertificadoUseCase = new DeleteCertificadoUseCase(certificadosRepository)
	const certificado = await deleteCertificadoUseCase.execute({ id });

	if (certificado.isLeft())
		return reply
			.status(400)
			.send(certificado.value.error)

	return reply
		.status(201)
		.send(certificado.value.certificado);
}
