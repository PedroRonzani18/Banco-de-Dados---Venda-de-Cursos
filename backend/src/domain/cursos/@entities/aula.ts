import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Atividade } from "./atividade";

export type UpdateAulaProps = {
    index?: number
    idTopico?: string
    titulo?: string
    descricao?: string
    urlVideo?: string
    duracaoEstimada?: number
};

export type AulaProps = {
    index: number
    idTopico: string
    titulo: string
    descricao: string
    urlVideo?: string
    duracaoEstimada: number

    atividades: Atividade[]
};

export class Aula extends Entity<AulaProps> {

    constructor(props: AulaProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get index() { return this.data.index }
    get idTopico() { return this.data.idTopico }
    get titulo() { return this.data.titulo }
    get descricao() { return this.data.descricao }
    get urlVideo() { return this.data.urlVideo }
    get duracaoEstimada() { return this.data.duracaoEstimada }
    get atividades() { return this.data.atividades }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
