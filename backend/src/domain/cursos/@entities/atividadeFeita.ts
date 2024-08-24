import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type UpdateAtividadeFeitaProps = {
    usuarioId?: string
    atividadeId?: string
    dataFinzalizacao?: string
};

export type AtividadeFeitaProps = {
    usuarioId: string
    atividadeId: string
    dataFinzalizacao: Date
};

export class AtividadeFeita extends Entity<AtividadeFeitaProps> {

    constructor(props: AtividadeFeitaProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get usuarioId() { return this.usuarioId }
    get atividadeId() { return this.atividadeId }
    get dataFinzalizacao() { return this.dataFinzalizacao }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
