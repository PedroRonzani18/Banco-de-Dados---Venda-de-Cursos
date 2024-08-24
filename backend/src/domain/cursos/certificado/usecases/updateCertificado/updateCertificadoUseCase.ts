import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Certificado, UpdateCertificadoProps } from "../../../@entities/certificado"
import { CertificadosRepository } from "../../repositories/certificadoInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateCertificadoUseCaseRequest {
    id: string
    data: UpdateCertificadoProps
}

type UpdateCertificadoUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { certificado: Certificado }
>

export class UpdateCertificadoUseCase {

    constructor(private certificadosRepository: CertificadosRepository) { }

    async execute({ id, data }: UpdateCertificadoUseCaseRequest): Promise<UpdateCertificadoUseCaseResponse> {

        const certificado = await this.certificadosRepository.update(id, data)

        if (!certificado)
            return left({ error: new ResourceNotFoundError(`Certificado ${id}`) })

        return right({ certificado })
    }
}