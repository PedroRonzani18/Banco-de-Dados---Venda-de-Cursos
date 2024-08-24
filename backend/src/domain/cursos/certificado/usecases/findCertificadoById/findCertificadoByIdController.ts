import { FastifyReply, FastifyRequest } from 'fastify';
import { CertificadosOracleRepository } from '../../repositories/certificadoOracleRepository';
import { FindCertificadoByIdUseCase } from './findCertificadoByIdUseCase';
import { z } from 'zod';

export const createCertificadoBodySchema = z.object({
	id: z.number(),
});

export async function findCertificadoByIdController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createCertificadoBodySchema.parse(request.params);

	const certificadosRepository = new CertificadosOracleRepository()
    const findCertificadoByIdUseCase = new FindCertificadoByIdUseCase(certificadosRepository)

	const certificado = await findCertificadoByIdUseCase.execute({ id });

	if (certificado.isLeft())
		return reply
			.status(400)
			.send(certificado.value.error)

	return reply
		.status(201)
		.send(certificado.value.certificado);
}
