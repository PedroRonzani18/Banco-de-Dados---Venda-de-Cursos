import { Professor, ProfessorProps, UpdateProfessorProps } from "../../@entities/professor"

export interface ProfessorsRepository {
    create(data: ProfessorProps): Promise<Professor>
    findByNome(nome: string): Promise<Professor | null>
    findById(name: string): Promise<Professor | null>
    list(): Promise<Professor[]>
    delete(id: string): Promise<Professor | null>
    update(id: string, data: UpdateProfessorProps): Promise<Professor | null>
}