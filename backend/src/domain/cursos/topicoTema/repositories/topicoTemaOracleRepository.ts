import { TopicoTemaProps, TopicoTema, UpdateTopicoTemaProps } from "../../@entities/topicoTema";
import { TopicoTemasRepository } from "./topicoTemaInterfaceRepository";

export class TopicoTemasOracleRepository implements TopicoTemasRepository {
    create(data: TopicoTemaProps): Promise<TopicoTema> {
        throw new Error("Method not implemented.");
    }
    findByIdTopicoTema(idTopico: number, idTema: number): Promise<TopicoTema | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<TopicoTema | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<TopicoTema[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<TopicoTema | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateTopicoTemaProps): Promise<TopicoTema | null> {
        throw new Error("Method not implemented.");
    }
}
