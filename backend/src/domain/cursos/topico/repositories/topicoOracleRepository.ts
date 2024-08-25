import { TopicoProps, Topico, UpdateTopicoProps } from "../../@entities/topico";
import { TopicosRepository } from "./topicoInterfaceRepository";

export class TopicosOracleRepository implements TopicosRepository {
    create(cursoId: number, data: TopicoProps): Promise<Topico> {
        throw new Error("Method not implemented.");
    }
    findByTituloIdCurso(titulo: string, idAula: number): Promise<Topico | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Topico | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Topico[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Topico | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateTopicoProps): Promise<Topico | null> {
        throw new Error("Method not implemented.");
    }
}
