import { AtividadeProps, Atividade, UpdateAtividadeProps } from "../../@entities/atividade";
import { AtividadesRepository } from "./atividadeInterfaceRepository";

export class AtividadesOracleRepository implements AtividadesRepository {
    create(idAula: string, data: AtividadeProps): Promise<Atividade> {
        throw new Error("Method not implemented.");
    }
    findByTituloIdAula(titulo: string, idAula: string): Promise<Atividade | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Atividade | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Atividade[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Atividade | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: UpdateAtividadeProps): Promise<Atividade | null> {
        throw new Error("Method not implemented.");
    }
}
