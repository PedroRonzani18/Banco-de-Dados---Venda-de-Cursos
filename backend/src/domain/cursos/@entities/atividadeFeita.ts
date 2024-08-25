import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type UpdateAtividadeFeitaProps = {
    usuarioId?: number
    atividadeId?: number
    dataFinzalizacao?: string
};

export type AtividadeFeitaProps = {
    usuarioId: number
    atividadeId: number
    dataFinzalizacao: Date
};

export class AtividadeFeita extends Entity<AtividadeFeitaProps> {

    constructor(props: AtividadeFeitaProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get usuarioId() { return this.props.usuarioId }
    get atividadeId() { return this.props.atividadeId }
    get dataFinzalizacao() { return this.props.dataFinzalizacao }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
