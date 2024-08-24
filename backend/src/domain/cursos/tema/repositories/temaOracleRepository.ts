import { TemaProps, Tema, UpdateTemaProps } from "../../@entities/tema";
import { TemasRepository } from "./temaInterfaceRepository";

export class TemasOracleRepository implements TemasRepository {
    create(data: TemaProps): Promise<Tema> {
        throw new Error("Method not implemented.");
    }
    findByNome(nome: string): Promise<Tema | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Tema | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Tema[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Tema | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: UpdateTemaProps): Promise<Tema | null> {
        throw new Error("Method not implemented.");
    }
}
