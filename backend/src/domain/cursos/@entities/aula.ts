import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Atividade } from "./atividade";

export type UpdateAulaProps = {
    index?: number
    idTopico?: number
    titulo?: string
    descricao?: string
    urlVideo?: string
    duracaoEstimada?: number
};

export type AulaProps = {
    index: number
    idTopico: number
    titulo: string
    descricao: string
    urlVideo?: string
    duracaoEstimada: number
};

export class Aula extends Entity<AulaProps> {

    constructor(props: AulaProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get index() { return this.props.index }
    get idTopico() { return this.props.idTopico }
    get titulo() { return this.props.titulo }
    get descricao() { return this.props.descricao }
    get urlVideo() { return this.props.urlVideo }
    get duracaoEstimada() { return this.props.duracaoEstimada }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
