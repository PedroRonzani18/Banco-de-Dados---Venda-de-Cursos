import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type UpdateTemaProps = {
    nome?: string
};

export type TemaProps = {
    nome: string
};

export class Tema extends Entity<TemaProps> {

    constructor(props: TemaProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get nome() { return this.nome }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
