import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Certificado } from "@/domain/cursos/@entities/certificado"
import { CertificadosRepository } from "../../repositories/certificadoInterfaceRepository"

interface FindCertificadoByIdUseCaseRequest {
    id: string
}

type FindCertificadoByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { certificado: Certificado }
>

export class FindCertificadoByIdUseCase {

    constructor(private certificadosRepository: CertificadosRepository) { }

    async execute({ id }: FindCertificadoByIdUseCaseRequest): Promise<FindCertificadoByIdUseCaseResponse> {

        const certificado = await this.certificadosRepository.findById(id)
        if (!certificado)
            return left({error: new ResourceNotFoundError("Certificado")})

        return right({ certificado })
    }
}