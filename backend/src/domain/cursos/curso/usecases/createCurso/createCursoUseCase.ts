import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Curso } from "../../../@entities/curso"
import { CursosRepository } from "../../repositories/cursoInterfaceRepository"
import { FindCursoByNomeUseCase } from "../findCursoByNome/findCursoByNomeUseCase"
import { UsersRepository } from "@/domain/users/user/repositories/userInterfaceRepository"
import { FindUserByIdUseCase } from "@/domain/users/user/usecases/findUserById/findUserByIdUseCase"

interface CreateCursoUseCaseRequest {
    usuarioId: number
    imagem: string
    nome: string
    descricao: string
    cargaHora: number
    preco: number
}

type CreateCursoUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { curso: Curso }
>

export class CreateCursoUseCase {

    constructor(private cursosRepository: CursosRepository, private usersRepository: UsersRepository) { }

    async execute({ usuarioId, cargaHora, descricao, nome, preco, imagem }: CreateCursoUseCaseRequest): Promise<CreateCursoUseCaseResponse> {

        const findCursoByNomeUseCase = new FindCursoByNomeUseCase(this.cursosRepository)
        const possibleCurso = await findCursoByNomeUseCase.execute({ nome })
        if (possibleCurso.isRight())
            return left({ error: new ResourceAlreadyExistsError(`Curso ${nome}`) })

        const dono = await (new FindUserByIdUseCase(this.usersRepository)).execute({ id: usuarioId })
        if (dono.isLeft())
            return left({ error: new ResourceAlreadyExistsError(`User ${usuarioId}`) })

        const curso = await this.cursosRepository.create({ cargaHora, dataCadastro: new Date(), descricao, nome, preco, usuarioId, imagem })

        return right({ curso })
    }
}