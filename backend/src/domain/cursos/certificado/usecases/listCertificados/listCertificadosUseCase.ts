import { Either, left, right } from "@/core/types/either"
import { Certificado } from "../../../@entities/certificado"
import { CertificadosRepository } from "../../repositories/certificadoInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListCertificadosUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { certificados: Certificado[] }
>

export class ListCertificadosUseCase {

    constructor(private certificadosRepository: CertificadosRepository) { }

    async execute(): Promise<ListCertificadosUseCaseResponse> {

        const certificados = await this.certificadosRepository.list()

        if(certificados.length === 0)
            return left({ error: new ResourceNotFoundError('Certificados') })

        return right({ certificados })
    }
}