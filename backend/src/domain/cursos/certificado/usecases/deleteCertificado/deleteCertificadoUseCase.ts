import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Certificado } from "@/domain/cursos/@entities/certificado"
import { CertificadosRepository } from "../../repositories/certificadoInterfaceRepository"

interface DeleteCertificadoUseCaseRequest {
    id: string
}

type DeleteCertificadoUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { certificado: Certificado }
>

export class DeleteCertificadoUseCase {

    constructor(private certificadosRepository: CertificadosRepository) { }

    async execute({ id }: DeleteCertificadoUseCaseRequest): Promise<DeleteCertificadoUseCaseResponse> {

        const certificado = await this.certificadosRepository.delete(id)
        if (!certificado)
            return left({ error: new ResourceNotFoundError("Certificado") })

        return right({ certificado })
    }
}