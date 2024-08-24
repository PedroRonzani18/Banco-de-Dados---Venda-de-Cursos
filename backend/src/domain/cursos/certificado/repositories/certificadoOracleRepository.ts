import { CertificadoProps, Certificado, UpdateCertificadoProps } from "../../@entities/certificado";
import { CertificadosRepository } from "./certificadoInterfaceRepository";

export class CertificadosOracleRepository implements CertificadosRepository {
    create(data: CertificadoProps): Promise<Certificado> {
        throw new Error("Method not implemented.");
    }
    findByUsuarioCurso(cursoId: number, usuarioId: number): Promise<Certificado | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Certificado | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Certificado[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Certificado | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateCertificadoProps): Promise<Certificado | null> {
        throw new Error("Method not implemented.");
    }
}
