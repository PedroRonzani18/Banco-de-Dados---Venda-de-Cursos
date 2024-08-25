import { AulaAssistidaProps, AulaAssistida, UpdateAulaAssistidaProps } from "../../@entities/aulaAssistida";
import { AulaAssistidasRepository } from "./aulaAssistidaInterfaceRepository";

export class AulaAssistidasOracleRepository implements AulaAssistidasRepository {
    create(data: AulaAssistidaProps): Promise<AulaAssistida> {
        throw new Error("Method not implemented.");
    }
    findByIdAulaAssistida(idAula: number, idUsuario: number): Promise<AulaAssistida | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<AulaAssistida | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<AulaAssistida[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<AulaAssistida | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateAulaAssistidaProps): Promise<AulaAssistida | null> {
        throw new Error("Method not implemented.");
    }
}
