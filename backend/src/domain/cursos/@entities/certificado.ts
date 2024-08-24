import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type UpdateCertificadoProps = {
    usuarioId?: number
    cursoId?: number
    dataCertificado?: Date
};

export type CertificadoProps = {
    certificado: string
    usuarioId: number
    cursoId: number
    dataCertificado: Date
};

export class Certificado extends Entity<CertificadoProps> {

    constructor(props: CertificadoProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get certificado() { return this.props.certificado }
    get usuarioId() { return this.props.usuarioId }
    get cursoId() { return this.props.cursoId }
    get dataCertificado() { return this.props.dataCertificado }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
