import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type UpdateProfessorProps = {
    nome?: string
};

export type ProfessorProps = {
    nome: string
};

export class Professor extends Entity<ProfessorProps> {

    constructor(props: ProfessorProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get nome() { return this.props.nome }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
