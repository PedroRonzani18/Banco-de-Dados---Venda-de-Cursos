import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Topico } from "./topico";

export type UpdateCursoProps = {
    nome?: string
    descricao?: string
    cargaHora?: number
    dataCadastro?: Date
    preco?: number
};

export type CursoProps = {
    nome: string
    descricao: string
    cargaHora: number
    dataCadastro: Date
    preco: number
    topicos: Topico[]
};

export class Curso extends Entity<CursoProps> {

    constructor(props: CursoProps, id?: UniqueEntityID) {
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
