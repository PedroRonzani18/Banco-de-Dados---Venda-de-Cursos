import { FastifyReply, FastifyRequest } from 'fastify';
import { TemasOracleRepository } from '../../repositories/temaOracleRepository';
import { FrequenciaTemaUseCase } from './frequenciaTemaUseCase';

export async function frequenciaTemaController(request: FastifyRequest, reply: FastifyReply) {

	const temasRepository = new TemasOracleRepository()
    const frequenciaTemaUseCase = new FrequenciaTemaUseCase(temasRepository)

	const tema = await frequenciaTemaUseCase.execute();

	if (tema.isLeft())
		return reply
			.status(400)
			.send(tema.value.error)

	return reply
		.status(201)
		.send(tema.value.temas);
}
