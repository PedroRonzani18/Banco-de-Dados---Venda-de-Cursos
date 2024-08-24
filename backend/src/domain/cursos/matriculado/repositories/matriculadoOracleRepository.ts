import { MatriculadoProps, Matriculado, UpdateMatriculadoProps } from "../../@entities/matriculado";
import { MatriculadosRepository } from "./matriculadoInterfaceRepository";

export class MatriculadosOracleRepository implements MatriculadosRepository {
    create(data: MatriculadoProps): Promise<Matriculado> {
        throw new Error("Method not implemented.");
    }
    findByUsuarioCurso(cursoId: number, usuarioId: number): Promise<Matriculado | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Matriculado | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Matriculado[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Matriculado | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateMatriculadoProps): Promise<Matriculado | null> {
        throw new Error("Method not implemented.");
    }
}
