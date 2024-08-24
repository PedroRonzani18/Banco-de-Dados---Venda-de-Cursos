import { Matriculado, MatriculadoProps, UpdateMatriculadoProps } from "../../@entities/matriculado"

export interface MatriculadosRepository {
    create(data: MatriculadoProps): Promise<Matriculado>
    findByUsuarioCurso(cursoId: number, usuarioId: number): Promise<Matriculado | null>
    findById(id: number): Promise<Matriculado | null>
    list(): Promise<Matriculado[]>
    delete(id: number): Promise<Matriculado | null>
    update(id: number, data: UpdateMatriculadoProps): Promise<Matriculado | null>
}