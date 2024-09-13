import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { AulaAssistida } from "../../../@entities/aulaAssistida"
import { AulaAssistidasRepository } from "../../repositories/aulaAssistidaInterfaceRepository"
import { FindAulaAssistidaByTituloUseCase } from "../findAulaAssistidaByTitulo/findAulaAssistidaByTituloUseCase"

interface LeftJoinUseCaseRequest {
    idUsuario: number,
    idCurso: number
}

type LeftJoinUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    {
        aulaAssistida: {
            nome: string;
            assistido: boolean;
        }[]
    }
>

export class LeftJoinUseCase {

    constructor(private aulaAssistidasRepository: AulaAssistidasRepository) { }

    async execute({ idUsuario, idCurso }: LeftJoinUseCaseRequest): Promise<LeftJoinUseCaseResponse> {

        const aulaAssistida = await this.aulaAssistidasRepository.leftJoin(idUsuario, idCurso)

        return right({ aulaAssistida })
    }
}