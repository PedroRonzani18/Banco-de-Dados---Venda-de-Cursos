import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Certificado } from "../../../@entities/certificado"
import { CertificadosRepository } from "../../repositories/certificadoInterfaceRepository"
import { FindCertificadoByUsuarioCursoUseCase } from "../findCertificadoByUsuarioCurso/findCertificadoByUsuarioCursoUseCase"

interface CreateCertificadoUseCaseRequest {
    usuarioId: number
    cursoId: number
    dataCertificado: Date
}

type CreateCertificadoUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { certificado: Certificado }
>

export class CreateCertificadoUseCase {

    constructor(private certificadosRepository: CertificadosRepository) { }

    async execute({ cursoId, usuarioId, dataCertificado }: CreateCertificadoUseCaseRequest): Promise<CreateCertificadoUseCaseResponse> {

        const findCertificadoByUsuarioCursoUseCase = new FindCertificadoByUsuarioCursoUseCase(this.certificadosRepository)

        const possibleCertificado = await findCertificadoByUsuarioCursoUseCase.execute({ cursoId, usuarioId })

        if (possibleCertificado.isRight())
            return left({ error: new ResourceAlreadyExistsError(`Usuario ${usuarioId} certificado no curso ${cursoId}`) })

        const certificado = await this.certificadosRepository.create({cursoId, dataCertificado ,usuarioId})

        return right({ certificado })
    }
}