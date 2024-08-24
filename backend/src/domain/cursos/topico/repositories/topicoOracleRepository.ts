import { TopicoProps, Topico, UpdateTopicoProps } from "../../@entities/topico";
import { TopicosRepository } from "./topicoInterfaceRepository";

export class TopicosOracleRepository implements TopicosRepository {
    create(idCurso: string, data: TopicoProps): Promise<Topico> {
        throw new Error("Method not implemented.");
    }
    findByTituloIdCurso(titulo: string, idAula: string): Promise<Topico | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Topico | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Topico[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Topico | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: UpdateTopicoProps): Promise<Topico | null> {
        throw new Error("Method not implemented.");
    }
}
