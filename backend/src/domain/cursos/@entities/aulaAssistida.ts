import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type UpdateAulaAssistidaProps = {
    dataAssistir?: Date,
    idUsuario?: number,
    idAula?: number,
};

export type AulaAssistidaProps = {
    dataAssistir: Date,
    idUsuario: number,
    idAula: number,
};

export class AulaAssistida extends Entity<AulaAssistidaProps> {

    constructor(props: AulaAssistidaProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get dataAssistir() { return this.props.dataAssistir }
    get idUsuario() { return this.props.idUsuario }
    get idAula() { return this.props.idAula }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
