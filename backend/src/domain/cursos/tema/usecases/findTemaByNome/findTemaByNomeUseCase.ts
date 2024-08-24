import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Tema } from "@/domain/cursos/@entities/tema"
import { TemasRepository } from "../../repositories/temaInterfaceRepository"

interface FindTemaByNomeUseCaseRequest {
    nome: string
}

type FindTemaByNomeUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { tema: Tema }
>

export class FindTemaByNomeUseCase {

    constructor(private temasRepository: TemasRepository) { }

    async execute({ nome }: FindTemaByNomeUseCaseRequest): Promise<FindTemaByNomeUseCaseResponse> {

        const tema = await this.temasRepository.findByNome(nome)
        if (!tema)
            return left({ error: new ResourceNotFoundError("Tema") })

        return right({ tema })
    }
}