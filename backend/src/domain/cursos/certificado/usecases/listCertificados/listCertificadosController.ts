import { FastifyReply, FastifyRequest } from 'fastify';
import { CertificadosOracleRepository } from '../../repositories/certificadoOracleRepository';
import { ListCertificadosUseCase } from './listCertificadosUseCase';

export async function listCertificadosController(request: FastifyRequest, reply: FastifyReply) {

	const certificadosRepository = new CertificadosOracleRepository()
    const listCertificadosUseCase = new ListCertificadosUseCase(certificadosRepository)

	const certificado = await listCertificadosUseCase.execute();

	if (certificado.isLeft())
		return reply
			.status(400)
			.send(certificado.value.error)

	return reply
		.status(201)
		.send(certificado.value.certificados);
}
