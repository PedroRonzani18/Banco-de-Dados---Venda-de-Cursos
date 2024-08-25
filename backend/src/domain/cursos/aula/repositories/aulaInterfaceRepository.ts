import { Aula, AulaProps, UpdateAulaProps } from "../../@entities/aula"

export interface AulasRepository {
    create(idTopico: number, data: AulaProps): Promise<Aula>
    findByTituloIdCurso(titulo: string, idAula: number): Promise<Aula | null>
    findById(id: number): Promise<Aula | null>
    list(): Promise<Aula[]>
    delete(id: number): Promise<Aula | null>
    update(id: number, data: UpdateAulaProps): Promise<Aula | null>
}