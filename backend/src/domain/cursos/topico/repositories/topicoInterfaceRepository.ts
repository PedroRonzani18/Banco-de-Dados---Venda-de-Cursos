import { Topico, TopicoProps, UpdateTopicoProps } from "../../@entities/topico"

export interface TopicosRepository {
    create(idCurso: string, data: TopicoProps): Promise<Topico>
    findByTituloIdCurso(titulo: string, idAula: string): Promise<Topico | null>
    findById(name: string): Promise<Topico | null>
    list(): Promise<Topico[]>
    delete(id: string): Promise<Topico | null>
    update(id: string, data: UpdateTopicoProps): Promise<Topico | null>
}