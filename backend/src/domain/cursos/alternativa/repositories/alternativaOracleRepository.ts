import { AlternativaProps, Alternativa, UpdateAlternativaProps } from "../../@entities/alternativa";
import { AlternativasRepository } from "./alternativaInterfaceRepository";

export class AlternativasOracleRepository implements AlternativasRepository {
    create(id: number, data: AlternativaProps): Promise<Alternativa> {
        throw new Error("Method not implemented.");
    }
    findByNumeroAtividadeId(numeroAtividade: number, idAtividade: number): Promise<Alternativa | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Alternativa | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Alternativa[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Alternativa | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateAlternativaProps): Promise<Alternativa | null> {
        throw new Error("Method not implemented.");
    }
}
