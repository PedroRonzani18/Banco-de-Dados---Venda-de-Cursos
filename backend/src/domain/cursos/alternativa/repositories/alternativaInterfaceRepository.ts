import { Alternativa, AlternativaProps, UpdateAlternativaProps } from "../../@entities/alternativa"

export interface AlternativasRepository {
    create(id: number, data: AlternativaProps): Promise<Alternativa>
    findByNumeroAtividadeId(numeroAtividade: number, idAtividade: number): Promise<Alternativa | null>
    findById(name: number): Promise<Alternativa | null>
    list(): Promise<Alternativa[]>
    delete(id: number): Promise<Alternativa | null>
    update(id: number, data: UpdateAlternativaProps): Promise<Alternativa | null>
}