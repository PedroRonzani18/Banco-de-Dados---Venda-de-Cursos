import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type UpdateAtividadeProps = {
    idAula?: number
    enunciado?: string
    titulo?: string
};

export type AtividadeProps = {
    idAula: number
    enunciado: string
    titulo: string
};

export class Atividade extends Entity<AtividadeProps> {

    constructor(props: AtividadeProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get idAula() { return this.props.idAula }
    get enunciado() { return this.props.enunciado }
    get titulo() { return this.props.titulo }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
