import { Aula, AulaProps, UpdateAulaProps } from "../../@entities/aula"

export interface AulasRepository {
    create(idTopico: string, data: AulaProps): Promise<Aula>
    findByTituloIdCurso(titulo: string, idAula: string): Promise<Aula | null>
    findById(name: string): Promise<Aula | null>
    list(): Promise<Aula[]>
    delete(id: string): Promise<Aula | null>
    update(id: string, data: UpdateAulaProps): Promise<Aula | null>
}