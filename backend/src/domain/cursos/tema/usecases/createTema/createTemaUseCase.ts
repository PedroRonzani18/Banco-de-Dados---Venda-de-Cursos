import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Tema } from "../../../@entities/tema"
import { TemasRepository } from "../../repositories/temaInterfaceRepository"
import { FindTemaByNomeUseCase } from "../findTemaByNome/findTemaByNomeUseCase"

interface CreateTemaUseCaseRequest {
    nome: string
}

type CreateTemaUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { tema: Tema }
>

export class CreateTemaUseCase {

    constructor(private temasRepository: TemasRepository) { }

    async execute({ nome }: CreateTemaUseCaseRequest): Promise<CreateTemaUseCaseResponse> {

        const findTemaByNomeUseCase = new FindTemaByNomeUseCase(this.temasRepository)

        const possibleTema = await findTemaByNomeUseCase.execute({ nome })

        if (possibleTema.isRight())
            return left({ error: new ResourceAlreadyExistsError(`Tema ${nome}`) })

        const tema = await this.temasRepository.create({ nome })

        return right({ tema })
    }
}