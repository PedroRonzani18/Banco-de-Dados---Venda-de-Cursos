import { Topico, TopicoProps, UpdateTopicoProps } from "../../@entities/topico"

export interface TopicosRepository {
    create(idCurso: number, data: TopicoProps): Promise<Topico>
    findByTituloIdCurso(titulo: string, idAula: number): Promise<Topico | null>
    findById(id: number): Promise<Topico | null>
    list(): Promise<Topico[]>
    listById(id: number): Promise<Topico[]>
    delete(id: number): Promise<Topico | null>
    update(id: number, data: UpdateTopicoProps): Promise<Topico | null>
    countTopicosFromCurso(cursoId: number): Promise<number> 
}