import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Curso } from "../../../@entities/curso"
import { CursosRepository } from "../../repositories/cursoInterfaceRepository"
import { FindCursoByNomeUseCase } from "../findCursoByNome/findCursoByNomeUseCase"

interface CreateCursoUseCaseRequest {
    nome: string
    descricao: string
    cargaHora: number
    dataCadastro: Date
    preco: number
}

type CreateCursoUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { curso: Curso }
>

export class CreateCursoUseCase {

    constructor(private cursosRepository: CursosRepository) { }

    async execute({ cargaHora, dataCadastro, descricao, nome, preco }: CreateCursoUseCaseRequest): Promise<CreateCursoUseCaseResponse> {

        const findCursoByNomeUseCase = new FindCursoByNomeUseCase(this.cursosRepository)

        const possibleCurso = await findCursoByNomeUseCase.execute({ nome })

        if (possibleCurso.isRight())
            return left({ error: new ResourceAlreadyExistsError(`Curso ${nome}`) })

        const curso = await this.cursosRepository.create({ cargaHora, dataCadastro, descricao, nome, preco, topicos: [] })

        return right({ curso })
    }
}