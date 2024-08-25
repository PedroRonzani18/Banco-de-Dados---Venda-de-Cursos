import { Atividade, AtividadeProps, UpdateAtividadeProps } from "../../@entities/atividade"

export interface AtividadesRepository {
    create(idAula: number, data: AtividadeProps): Promise<Atividade>
    findByTituloIdAula(titulo: string, idAula: number): Promise<Atividade | null>
    findById(id: number): Promise<Atividade | null>
    list(): Promise<Atividade[]>
    delete(id: number): Promise<Atividade | null>
    update(id: number, data: UpdateAtividadeProps): Promise<Atividade | null>
}