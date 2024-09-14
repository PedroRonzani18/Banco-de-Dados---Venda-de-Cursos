import { Either, left, right } from "@/core/types/either"
import { Tema } from "../../../@entities/tema"
import { TemasRepository } from "../../repositories/temaInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type FrequenciaTemaUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { temas: {
        nome: string;
        freq: number;
    }[] }
>

export class FrequenciaTemaUseCase {

    constructor(private temasRepository: TemasRepository) { }

    async execute(): Promise<FrequenciaTemaUseCaseResponse> {

        const temas = await this.temasRepository.frequenciaTema()

        if(temas.length === 0)
            return left({ error: new ResourceNotFoundError('Temas') })

        return right({ temas })
    }
}