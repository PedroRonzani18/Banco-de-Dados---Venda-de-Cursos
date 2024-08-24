import { AtividadeFeitaProps, AtividadeFeita, UpdateAtividadeFeitaProps } from "../../@entities/atividadeFeita";
import { AtividadeFeitasRepository } from "./atividadeFeitaInterfaceRepository";

export class AtividadeFeitasOracleRepository implements AtividadeFeitasRepository {
    create(data: AtividadeFeitaProps): Promise<AtividadeFeita> {
        throw new Error("Method not implemented.");
    }
    findByUsuarioAtividade(cursoId: string, usuarioId: string): Promise<AtividadeFeita | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<AtividadeFeita | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<AtividadeFeita[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<AtividadeFeita | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: UpdateAtividadeFeitaProps): Promise<AtividadeFeita | null> {
        throw new Error("Method not implemented.");
    }
}
