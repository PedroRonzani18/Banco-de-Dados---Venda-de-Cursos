import { Certificado, CertificadoProps, UpdateCertificadoProps } from "../../@entities/certificado"

export interface CertificadosRepository {
    create(data: CertificadoProps): Promise<Certificado>
    findByUsuarioCurso(cursoId: string, usuarioId: string): Promise<Certificado | null>
    findById(name: string): Promise<Certificado | null>
    list(): Promise<Certificado[]>
    delete(id: string): Promise<Certificado | null>
    update(id: string, data: UpdateCertificadoProps): Promise<Certificado | null>
}