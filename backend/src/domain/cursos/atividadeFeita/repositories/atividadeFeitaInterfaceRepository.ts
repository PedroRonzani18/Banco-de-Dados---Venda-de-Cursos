import { AtividadeFeita, AtividadeFeitaProps, UpdateAtividadeFeitaProps } from "../../@entities/atividadeFeita"

export interface AtividadeFeitasRepository {
    create(data: AtividadeFeitaProps): Promise<AtividadeFeita>
    findByUsuarioAtividade(cursoId: number, usuarioId: number): Promise<AtividadeFeita | null>
    findById(id: number): Promise<AtividadeFeita | null>
    list(): Promise<AtividadeFeita[]>
    delete(id: number): Promise<AtividadeFeita | null>
    update(id: number, data: UpdateAtividadeFeitaProps): Promise<AtividadeFeita | null>
}