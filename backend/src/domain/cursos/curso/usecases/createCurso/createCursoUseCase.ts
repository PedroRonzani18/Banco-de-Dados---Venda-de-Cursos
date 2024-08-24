import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Curso } from "../../../@entities/curso"
import { CursosRepository } from "../../repositories/cursoInterfaceRepository"
import { FindCursoByNomeUseCase } from "../findCursoByNome/findCursoByNomeUseCase"
import { UsersRepository } from "@/domain/users/user/repositories/userInterfaceRepository"
import { FindUserByIdUseCase } from "@/domain/users/user/usecases/findUserById/findUserByIdUseCase"

interface CreateCursoUseCaseRequest {
    donoId: string
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

    constructor(private cursosRepository: CursosRepository, private usersRepository: UsersRepository) { }

    async execute({ donoId, cargaHora, dataCadastro, descricao, nome, preco }: CreateCursoUseCaseRequest): Promise<CreateCursoUseCaseResponse> {

        const findCursoByNomeUseCase = new FindCursoByNomeUseCase(this.cursosRepository)

        const possibleCurso = await findCursoByNomeUseCase.execute({ nome })
        if (possibleCurso.isRight())
            return left({ error: new ResourceAlreadyExistsError(`Curso ${nome}`) })

        const dono = await (new FindUserByIdUseCase(this.usersRepository)).execute({ id: donoId })
        if (dono.isLeft())
            return left({ error: new ResourceAlreadyExistsError(`User ${donoId}`) })

        const curso = await this.cursosRepository.create({ cargaHora, dataCadastro, descricao, nome, preco, topicos: [], dono: dono.value.user })

        return right({ curso })
    }
}