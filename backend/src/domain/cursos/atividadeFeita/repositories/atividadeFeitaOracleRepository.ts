import { AtividadeFeitaProps, AtividadeFeita, UpdateAtividadeFeitaProps } from "../../@entities/atividadeFeita";
import { AtividadeFeitasRepository } from "./atividadeFeitaInterfaceRepository";

export class AtividadeFeitasOracleRepository implements AtividadeFeitasRepository {
    create(data: AtividadeFeitaProps): Promise<AtividadeFeita> {
        throw new Error("Method not implemented.");
    }
    findByUsuarioAtividade(cursoId: number, usuarioId: number): Promise<AtividadeFeita | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<AtividadeFeita | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<AtividadeFeita[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<AtividadeFeita | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateAtividadeFeitaProps): Promise<AtividadeFeita | null> {
        throw new Error("Method not implemented.");
    }
}
