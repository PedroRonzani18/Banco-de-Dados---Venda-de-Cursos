import { CertificadoProps, Certificado, UpdateCertificadoProps } from "../../@entities/certificado";
import { CertificadosRepository } from "./certificadoInterfaceRepository";

export class CertificadosOracleRepository implements CertificadosRepository {
    create(data: CertificadoProps): Promise<Certificado> {
        throw new Error("Method not implemented.");
    }
    findByUsuarioCurso(cursoId: string, usuarioId: string): Promise<Certificado | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Certificado | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Certificado[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Certificado | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: UpdateCertificadoProps): Promise<Certificado | null> {
        throw new Error("Method not implemented.");
    }
}
