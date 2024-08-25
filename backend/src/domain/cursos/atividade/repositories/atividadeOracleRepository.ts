import { AtividadeProps, Atividade, UpdateAtividadeProps } from "../../@entities/atividade";
import { AtividadesRepository } from "./atividadeInterfaceRepository";

export class AtividadesOracleRepository implements AtividadesRepository {
    create(idAula: number, data: AtividadeProps): Promise<Atividade> {
        throw new Error("Method not implemented.");
    }
    findByTituloIdAula(titulo: string, idAula: number): Promise<Atividade | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Atividade | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Atividade[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Atividade | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateAtividadeProps): Promise<Atividade | null> {
        throw new Error("Method not implemented.");
    }
}
