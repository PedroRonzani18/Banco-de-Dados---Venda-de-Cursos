import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Tema } from "@/domain/cursos/@entities/tema"
import { TemasRepository } from "../../repositories/temaInterfaceRepository"

interface FindTemaByIdUseCaseRequest {
    id: string
}

type FindTemaByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { tema: Tema }
>

export class FindTemaByIdUseCase {

    constructor(private temasRepository: TemasRepository) { }

    async execute({ id }: FindTemaByIdUseCaseRequest): Promise<FindTemaByIdUseCaseResponse> {

        const tema = await this.temasRepository.findById(id)
        if (!tema)
            return left({error: new ResourceNotFoundError("Tema")})

        return right({ tema })
    }
}