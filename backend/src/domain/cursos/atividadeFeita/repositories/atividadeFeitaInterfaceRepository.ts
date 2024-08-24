import { AtividadeFeita, AtividadeFeitaProps, UpdateAtividadeFeitaProps } from "../../@entities/atividadeFeita"

export interface AtividadeFeitasRepository {
    create(data: AtividadeFeitaProps): Promise<AtividadeFeita>
    findByUsuarioAtividade(cursoId: string, usuarioId: string): Promise<AtividadeFeita | null>
    findById(name: string): Promise<AtividadeFeita | null>
    list(): Promise<AtividadeFeita[]>
    delete(id: string): Promise<AtividadeFeita | null>
    update(id: string, data: UpdateAtividadeFeitaProps): Promise<AtividadeFeita | null>
}