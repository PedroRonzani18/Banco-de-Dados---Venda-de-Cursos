import { Curso, CursoProps, UpdateCursoProps } from "../../@entities/curso"

export interface CursosRepository {
    create(data: CursoProps): Promise<Curso>
    findByNome(titulo: string): Promise<Curso | null>
    findById(id: number): Promise<Curso | null>
    list(): Promise<Curso[]>
    listById(id: number): Promise<Curso[]>
    listCoursesEnrolledToUser(id: number): Promise<Curso[]>
    listTemasFromCurso(id: number): Promise<string[]>
    listProfessoresFromCurso(id: number): Promise<string[]>
    delete(id: number): Promise<Curso | null>
    update(id: number, data: UpdateCursoProps): Promise<Curso | null>
}