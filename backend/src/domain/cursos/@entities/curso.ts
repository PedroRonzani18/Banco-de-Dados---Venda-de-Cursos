import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Topico } from "./topico";

export type UpdateCursoProps = {
    nome?: string
    descricao?: string
    cargaHora?: number
    dataCadastro?: Date
    preco?: number
    usuarioId?: string
    imagem?: string
};

export type CursoProps = {
    nome: string
    descricao: string
    cargaHora: number
    dataCadastro: Date
    preco: number
    usuarioId: number
    imagem: string
};

export class Curso extends Entity<CursoProps> {

    constructor(props: CursoProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get nome() { return this.props.nome }
    get descricao() { return this.props.descricao }
    get cargaHora() { return this.props.cargaHora }
    get dataCadastro() { return this.props.dataCadastro }
    get preco() { return this.props.preco }
    get usuarioId() { return this.props.usuarioId }
    get imagem() { return this.props.imagem }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.props
        };
    }
}
