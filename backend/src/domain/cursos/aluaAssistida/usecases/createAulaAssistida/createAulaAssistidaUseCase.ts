import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { AulaAssistida } from "../../../@entities/aulaAssistida"
import { AulaAssistidasRepository } from "../../repositories/aulaAssistidaInterfaceRepository"
import { FindAulaAssistidaByTituloUseCase } from "../findAulaAssistidaByTitulo/findAulaAssistidaByTituloUseCase"

interface CreateAulaAssistidaUseCaseRequest {
    dataAssistir: Date
    idUsuario: number
    idAula: number
}

type CreateAulaAssistidaUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { aulaAssistida: AulaAssistida }
>

export class CreateAulaAssistidaUseCase {

    constructor(private aulaAssistidasRepository: AulaAssistidasRepository) { }

    async execute({ dataAssistir, idAula, idUsuario }: CreateAulaAssistidaUseCaseRequest): Promise<CreateAulaAssistidaUseCaseResponse> {

        const findAulaAssistidaByNomeUseCase = new FindAulaAssistidaByTituloUseCase(this.aulaAssistidasRepository)

        const possibleAulaAssistida = await findAulaAssistidaByNomeUseCase.execute({ idAula, idUsuario })

        if (possibleAulaAssistida.isRight())
            return left({ error: new ResourceAlreadyExistsError(`AulaAssistida ${idAula} ${idUsuario}`) })

        const aulaAssistida = await this.aulaAssistidasRepository.create({ idAula, idUsuario, dataAssistir })

        return right({ aulaAssistida })
    }
}