import { AulaProps, Aula, UpdateAulaProps } from "../../@entities/aula";
import { AulasRepository } from "./aulaInterfaceRepository";

export class AulasOracleRepository implements AulasRepository {
    create(idTopico: string, data: AulaProps): Promise<Aula> {
        throw new Error("Method not implemented.");
    }
    findByTituloIdCurso(titulo: string, idAula: string): Promise<Aula | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Aula | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Aula[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Aula | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: UpdateAulaProps): Promise<Aula | null> {
        throw new Error("Method not implemented.");
    }
}
