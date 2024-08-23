import { Atividade, AtividadeProps, UpdateAtividadeProps } from "../../@entities/atividade"

export interface AtividadesRepository {
    create(idAula: string, data: AtividadeProps): Promise<Atividade>
    findByTituloIdAula(titulo: string, idAula: string): Promise<Atividade | null>
    findById(name: string): Promise<Atividade | null>
    list(): Promise<Atividade[]>
    delete(id: string): Promise<Atividade | null>
    update(id: string, data: UpdateAtividadeProps): Promise<Atividade | null>
}