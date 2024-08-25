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

    aulas: Aula[]
    professores: Professor[]
    temas: Tema[]
};

export class Topico extends Entity<TopicoProps> {

    constructor(props: TopicoProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get cursoId() { return this.props.cursoId }
    get index() { return this.index }
    get titulo() { return this.titulo }
    get descricao() { return this.descricao }
    get aulas() { return this.aulas }
    get professores() { return this.professores }
    get temas() { return this.temas }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}