import { ProfessorProps, Professor, UpdateProfessorProps } from "../../@entities/professor";
import { ProfessorsRepository } from "./professorInterfaceRepository";

export class ProfessorsOracleRepository implements ProfessorsRepository {
    create(data: ProfessorProps): Promise<Professor> {
        throw new Error("Method not implemented.");
    }
    findByNome(nome: string): Promise<Professor | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Professor | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Professor[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Professor | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: UpdateProfessorProps): Promise<Professor | null> {
        throw new Error("Method not implemented.");
    }
}
