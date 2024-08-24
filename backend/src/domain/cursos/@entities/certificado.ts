import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type UpdateCertificadoProps = {
    usuarioId?: string
    cursoId?: string
    data?: Date
};

export type CertificadoProps = {
    usuarioId: string
    cursoId: string
    data: Date
};

export class Certificado extends Entity<CertificadoProps> {

    constructor(props: CertificadoProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get usuarioId() { return this.usuarioId }
    get cursoId() { return this.cursoId }
    get data() { return this.data }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
