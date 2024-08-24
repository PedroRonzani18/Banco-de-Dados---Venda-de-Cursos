import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Topico } from "./topico";
import { User } from "@/domain/users/@entities/user";

export type UpdateCursoProps = {
    nome?: string
    descricao?: string
    cargaHora?: number
    dataCadastro?: Date
    preco?: number
    donoId?: string
};

export type CursoProps = {
    nome: string
    descricao: string
    cargaHora: number
    dataCadastro: Date
    preco: number
    topicos: Topico[]
    dono: User
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
