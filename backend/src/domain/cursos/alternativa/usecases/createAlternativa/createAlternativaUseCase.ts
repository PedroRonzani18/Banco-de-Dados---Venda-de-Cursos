import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Alternativa } from "../../../@entities/alternativa"
import { AlternativasRepository } from "../../repositories/alternativaInterfaceRepository"
import { FindAlternativaByNumeroAtividadeIdUseCaseUseCase } from "../findAlternativaByNumeroAtividadeId/findAlternativaByNumeroAtividadeIdUseCase"

interface CreateAlternativaUseCaseRequest {
    idAtividade: number
    numAtividade: number
    certa: boolean
    descricao: string
}

type CreateAlternativaUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { alternativa: Alternativa }
>

export class CreateAlternativaUseCase {

    constructor(private alternativasRepository: AlternativasRepository) { }

    async execute({ idAtividade, certa, descricao, numAtividade }: CreateAlternativaUseCaseRequest): Promise<CreateAlternativaUseCaseResponse> {

        // const findAlternativaByNumeroAtividadeIdUseCase = new FindAlternativaByNumeroAtividadeIdUseCaseUseCase(this.alternativasRepository)

        // const possibleAlternativa = await findAlternativaByNumeroAtividadeIdUseCase.execute({ idAtividade, numAtividade })

        // if (possibleAlternativa.isRight()) {
        //     return left({ error: new ResourceAlreadyExistsError(`Alternativa's ${name} alternativa`) })
        // }

        const alternativa = await this.alternativasRepository.create(idAtividade, { certa, descricao, numAtividade, idAtividade })

        return right({ alternativa })
    }
}