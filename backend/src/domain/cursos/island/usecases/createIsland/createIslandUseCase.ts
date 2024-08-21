import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Island } from "../../../@entities/island"
import { IslandsRepository } from "../../repositories/islandInterfaceRepository"
import { FindIslandByNameUseCase } from "../findIslandByName/findIslandByNameUseCase"
import { Level } from "@/domain/cursos/@entities/level"
import { FindTrailByIdUseCase } from "@/domain/cursos/alternativa/usecases/findTrailById/findTrailByIdUseCase"
import { TrailsRepository } from "@/domain/cursos/alternativa/repositories/alternativaInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface CreateIslandUseCaseRequest {
    name: string
    description: string
    theme: string
    levels?: Level[]
    trailId: string
}

type CreateIslandUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { island: Island }
>

export class CreateIslandUseCase {

    constructor(private islandsRepository: IslandsRepository, private trailsRepository: TrailsRepository) { }

    async execute({ description, name, theme, levels, trailId }: CreateIslandUseCaseRequest): Promise<CreateIslandUseCaseResponse> {

        const findIslandByNameUseCase = new FindIslandByNameUseCase(this.islandsRepository)
        const possibleIsland = await findIslandByNameUseCase.execute({ islandName: name, trailId })
        if (possibleIsland.isRight())
            return left({ error: new ResourceAlreadyExistsError(`Trails's ${trailId} island ${name}`) })

        const findTrailByIdUseCase = new FindTrailByIdUseCase(this.trailsRepository)
        const possibleTrail = await findTrailByIdUseCase.execute({ id: trailId })
        if (possibleTrail.isLeft())
            return left({ error: new ResourceNotFoundError(`Trail ${trailId}`) })

        const index = await this.islandsRepository.countIslandsInTrail(trailId)

        const island = await this.islandsRepository.create({ description, levels, name, theme, trailId, index })

        return right({ island })
    }
}