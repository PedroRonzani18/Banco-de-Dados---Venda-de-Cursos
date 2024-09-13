import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { TopicoTema } from "../../../@entities/topicoTema"
import { TopicoTemasRepository } from "../../repositories/topicoTemaInterfaceRepository"
import { FindTopicoTemaByTituloUseCase } from "../findTopicoTemaByTitulo/findTopicoTemaByTituloUseCase"

interface CreateTopicoTemaUseCaseRequest {
    idTema: number
    idTopico: number
}

type CreateTopicoTemaUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { topicoTema: TopicoTema }
>

export class CreateTopicoTemaUseCase {

    constructor(private topicoTemasRepository: TopicoTemasRepository) { }

    async execute({ idTema, idTopico }: CreateTopicoTemaUseCaseRequest): Promise<CreateTopicoTemaUseCaseResponse> {

        // const findTopicoTemaByNomeUseCase = new FindTopicoTemaByTituloUseCase(this.topicoTemasRepository)

        // const possibleTopicoTema = await findTopicoTemaByNomeUseCase.execute({ idTema, idTopico })

        // if (possibleTopicoTema.isRight())
        //     return left({ error: new ResourceAlreadyExistsError(`TopicoTema ${idTema} ${idTopico}`) })

        const topicoTema = await this.topicoTemasRepository.create({ idTema, idTopico })

        return right({ topicoTema })
    }
}