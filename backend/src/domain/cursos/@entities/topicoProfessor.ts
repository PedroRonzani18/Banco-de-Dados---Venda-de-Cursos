import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type UpdateTopicoProfessorProps = {
    idProfessor?: number,
    idTopico?: number,
};

export type TopicoProfessorProps = {
    idProfessor: number,
    idTopico: number,
};

export class TopicoProfessor extends Entity<TopicoProfessorProps> {

    constructor(props: TopicoProfessorProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get idProfessor() { return this.props.idProfessor }
    get idTopico() { return this.props.idTopico }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
