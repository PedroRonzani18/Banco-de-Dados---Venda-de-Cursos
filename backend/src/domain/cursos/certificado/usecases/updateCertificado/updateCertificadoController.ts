import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CertificadosOracleRepository } from '../../repositories/certificadoOracleRepository';
import { UpdateCertificadoUseCase } from './updateCertificadoUseCase';

export const updateCertificadoParamsSchema = z.object({
	id: z.string(),
});

export const updateCertificadoBodySchema = z.object({
	usuarioId: z.string().optional(),
	cursoId: z.string().optional(),
	data: z.date().optional(),
});

export async function updateCertificadoController(request: FastifyRequest, reply: FastifyReply) {

	const data = updateCertificadoBodySchema.parse(request.body);
	const { id } = updateCertificadoParamsSchema.parse(request.params);

	const certificadosRepository = new CertificadosOracleRepository()
	const updateCertificadoUseCase = new UpdateCertificadoUseCase(certificadosRepository)

	const certificado = await updateCertificadoUseCase.execute({ id, data });

	if (certificado.isLeft())
		return reply
			.status(400)
			.send(certificado.value.error)

	return reply
		.status(201)
		.send(certificado.value.certificado);
}
