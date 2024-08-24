import { Curso, CursoProps, UpdateCursoProps } from "../../@entities/curso"

export interface CursosRepository {
    create(data: CursoProps): Promise<Curso>
    findByNome(titulo: string): Promise<Curso | null>
    findById(name: string): Promise<Curso | null>
    list(): Promise<Curso[]>
    delete(id: string): Promise<Curso | null>
    update(id: string, data: UpdateCursoProps): Promise<Curso | null>
}