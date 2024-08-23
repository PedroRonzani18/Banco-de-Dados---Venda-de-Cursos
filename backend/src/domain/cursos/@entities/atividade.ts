import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Alternativa } from "./alternativa";

export type UpdateAtividadeProps = {
    enunciado?: string
    titulo?: string
};

export type AtividadeProps = {
    enunciado: string
    titulo: string
    alternativas: Alternativa[]
};

export class Atividade extends Entity<AtividadeProps> {

    constructor(props: AtividadeProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get enunciado() { return this.enunciado }
    get titulo() { return this.titulo }
    get alternativas() { return this.alternativas }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
