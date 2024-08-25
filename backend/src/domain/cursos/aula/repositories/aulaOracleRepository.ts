import { AulaProps, Aula, UpdateAulaProps } from "../../@entities/aula";
import { AulasRepository } from "./aulaInterfaceRepository";

export class AulasOracleRepository implements AulasRepository {
    create(idTopico: number, data: AulaProps): Promise<Aula> {
        throw new Error("Method not implemented.");
    }
    findByTituloIdCurso(titulo: string, idAula: number): Promise<Aula | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Aula | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Aula[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Aula | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateAulaProps): Promise<Aula | null> {
        throw new Error("Method not implemented.");
    }
}
