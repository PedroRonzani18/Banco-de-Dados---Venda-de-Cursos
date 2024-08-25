import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type UpdateTopicoTemaProps = {
    idTema?: number,
    idTopico?: number,
};

export type TopicoTemaProps = {
    idTema: number,
    idTopico: number,
};

export class TopicoTema extends Entity<TopicoTemaProps> {

    constructor(props: TopicoTemaProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get idTema() { return this.props.idTema }
    get idTopico() { return this.props.idTopico }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
