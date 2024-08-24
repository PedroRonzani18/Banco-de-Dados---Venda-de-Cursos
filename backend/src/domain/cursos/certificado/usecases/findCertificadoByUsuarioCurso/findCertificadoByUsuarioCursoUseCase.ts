import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Certificado } from "@/domain/cursos/@entities/certificado"
import { CertificadosRepository } from "../../repositories/certificadoInterfaceRepository"

interface FindCertificadoByUsuarioCursoUseCaseRequest {
    usuarioId: string
    cursoId: string
}

type FindCertificadoByUsuarioCursoUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { certificado: Certificado }
>

export class FindCertificadoByUsuarioCursoUseCase {

    constructor(private certificadosRepository: CertificadosRepository) { }

    async execute({ cursoId, usuarioId }: FindCertificadoByUsuarioCursoUseCaseRequest): Promise<FindCertificadoByUsuarioCursoUseCaseResponse> {

        const certificado = await this.certificadosRepository.findByUsuarioCurso(cursoId, usuarioId)
        if (!certificado)
            return left({ error: new ResourceNotFoundError("Certificado") })

        return right({ certificado })
    }
}