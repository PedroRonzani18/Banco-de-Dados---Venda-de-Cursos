import { AlternativaProps, Alternativa, UpdateAlternativaProps } from "../../@entities/alternativa";
import { AlternativasRepository } from "./alternativaInterfaceRepository";

export class AlternativasOracleRepository implements AlternativasRepository {
    create(id: string, data: AlternativaProps): Promise<Alternativa> {
        throw new Error("Method not implemented.");
    }
    findByNumeroAtividadeId(numeroAtividade: number, idAtividade: string): Promise<Alternativa | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Alternativa | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Alternativa[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Alternativa | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: UpdateAlternativaProps): Promise<Alternativa | null> {
        throw new Error("Method not implemented.");
    }
}
