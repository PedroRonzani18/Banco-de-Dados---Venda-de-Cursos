import { Professor, ProfessorProps, UpdateProfessorProps } from "../../@entities/professor"

export interface ProfessorsRepository {
    create(data: ProfessorProps): Promise<Professor>
    findByNome(nome: string): Promise<Professor | null>
    findById(id: number): Promise<Professor | null>
    list(): Promise<Professor[]>
    delete(id: number): Promise<void>
    update(id: number, data: UpdateProfessorProps): Promise<Professor | null>
}