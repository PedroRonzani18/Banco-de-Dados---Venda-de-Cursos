import { Matriculado, MatriculadoProps, UpdateMatriculadoProps } from "../../@entities/matriculado"

export interface MatriculadosRepository {
    create(data: MatriculadoProps): Promise<Matriculado>
    findByUsuarioCurso(cursoId: string, usuarioId: string): Promise<Matriculado | null>
    findById(name: string): Promise<Matriculado | null>
    list(): Promise<Matriculado[]>
    delete(id: string): Promise<Matriculado | null>
    update(id: string, data: UpdateMatriculadoProps): Promise<Matriculado | null>
}