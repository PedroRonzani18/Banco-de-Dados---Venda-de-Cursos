import { Alternativa, AlternativaProps, UpdateAlternativaProps } from "../../@entities/alternativa"

export interface AlternativasRepository {
    create(id: string, data: AlternativaProps): Promise<Alternativa>
    findByNumeroAtividadeId(numeroAtividade: number, idAtividade: string): Promise<Alternativa | null>
    findById(name: string): Promise<Alternativa | null>
    list(): Promise<Alternativa[]>
    delete(id: string): Promise<Alternativa | null>
    update(id: string, data: UpdateAlternativaProps): Promise<Alternativa | null>
}