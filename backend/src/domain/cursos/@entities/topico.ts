import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Professor } from "./professor";
import { Tema } from "./tema";
import { Aula } from "./aula";

export type UpdateTopicoProps = {
    cursoId?: number
    index?: number
    titulo?: string
    descricao?: string
};

export type TopicoProps = {
    cursoId: number
    index: number
    titulo: string
    descricao: string
};

export class Topico extends Entity<TopicoProps> {

    constructor(props: TopicoProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get cursoId() { return this.props.cursoId }
    get index() { return this.props.index }
    get titulo() { return this.props.titulo }
    get descricao() { return this.props.descricao }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}