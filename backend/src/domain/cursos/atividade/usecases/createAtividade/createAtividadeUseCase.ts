import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Atividade } from "../../../@entities/atividade"
import { AtividadesRepository } from "../../repositories/atividadeInterfaceRepository"
import { FindAtividadeByTituloUseCase } from "../findAtividadeByTitulo/findAtividadeByTituloUseCase"

interface CreateAtividadeUseCaseRequest {
    idAula: string
    enunciado: string
    titulo: string
}

type CreateAtividadeUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { atividade: Atividade }
>

export class CreateAtividadeUseCase {

    constructor(private atividadesRepository: AtividadesRepository) { }

    async execute({ idAula, enunciado, titulo }: CreateAtividadeUseCaseRequest): Promise<CreateAtividadeUseCaseResponse> {

        const findAtividadeByTituloUseCase = new FindAtividadeByTituloUseCase(this.atividadesRepository)

        const possibleAtividade = await findAtividadeByTituloUseCase.execute({ titulo })

        if (possibleAtividade.isRight())
            return left({ error: new ResourceAlreadyExistsError(`Atividade ${enunciado} na Aula ${idAula}`) })

        const atividade = await this.atividadesRepository.create(idAula, { enunciado, titulo, alternativas: [] })

        return right({ atividade })
    }
}