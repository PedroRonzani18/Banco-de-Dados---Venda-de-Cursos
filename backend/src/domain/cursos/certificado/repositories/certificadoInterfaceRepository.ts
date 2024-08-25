import { Certificado, CertificadoProps, UpdateCertificadoProps } from "../../@entities/certificado"

export interface CertificadosRepository {
    create(data: CertificadoProps): Promise<Certificado>
    findByUsuarioCurso(cursoId: number, usuarioId: number): Promise<Certificado | null>
    findById(id: number): Promise<Certificado | null>
    list(): Promise<Certificado[]>
    delete(id: number): Promise<Certificado | null>
    update(id: number, data: UpdateCertificadoProps): Promise<Certificado | null>
}