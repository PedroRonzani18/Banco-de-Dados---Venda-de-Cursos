import { oracleConnection } from "@/core/db/oracle";
import { MatriculadoProps, Matriculado, UpdateMatriculadoProps } from "../../@entities/matriculado";
import { MatriculadosRepository } from "./matriculadoInterfaceRepository";

export class MatriculadosOracleRepository implements MatriculadosRepository {
    async create(data: MatriculadoProps): Promise<Matriculado> {

        console.log(`INSERT INTO ECLBDIT215.MATRICULADO(IDCURSO, IDUSUARIO, DATAMATRICULA) VALUES (${data.cursoId}, ${data.usuarioId}, TO_DATE('${data.dataMatricula.toISOString().slice(0, 10)}', 'YYYY-MM-DD'))`)

        await oracleConnection.execute(`INSERT INTO ECLBDIT215.MATRICULADO(IDCURSO, IDUSUARIO, DATAMATRICULA) VALUES (${data.cursoId}, ${data.usuarioId}, TO_DATE('${data.dataMatricula.toISOString().slice(0, 10)}', 'YYYY-MM-DD'))`)

        await oracleConnection.commit()

        return new Matriculado(data)
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
