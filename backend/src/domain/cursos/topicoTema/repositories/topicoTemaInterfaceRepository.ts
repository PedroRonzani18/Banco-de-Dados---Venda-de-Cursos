import { TopicoTema, TopicoTemaProps, UpdateTopicoTemaProps } from "../../@entities/topicoTema"

export interface TopicoTemasRepository {
    create(data: TopicoTemaProps): Promise<TopicoTema>
    findByIdTopicoTema(idTopico: number, idTema: number): Promise<TopicoTema | null>
    findById(id: number): Promise<TopicoTema | null>
    list(): Promise<TopicoTema[]>
    delete(id: number): Promise<TopicoTema | null>
    update(id: number, data: UpdateTopicoTemaProps): Promise<TopicoTema | null>
}