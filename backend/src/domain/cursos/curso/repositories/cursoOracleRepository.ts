import { CursoProps, Curso, UpdateCursoProps } from "../../@entities/curso";
import { CursosRepository } from "./cursoInterfaceRepository";

export class CursosOracleRepository implements CursosRepository {
    create(data: CursoProps): Promise<Curso> {
        throw new Error("Method not implemented.");
    }
    findByNome(titulo: string): Promise<Curso | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Curso | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Curso[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Curso | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateCursoProps): Promise<Curso | null> {
        throw new Error("Method not implemented.");
    }
}
