import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Alternativa } from "./alternativa";

export type UpdateMatriculadoProps = {
    usuarioId?: string
    cursoId?: string
    dataMatricula?: string
};

export type MatriculadoProps = {
    usuarioId: string
    cursoId: string
    dataMatricula: Date
};

export class Matriculado extends Entity<MatriculadoProps> {

    constructor(props: MatriculadoProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get usuarioId() { return this.usuarioId }
    get cursoId() { return this.cursoId }
    get dataMatricula() { return this.dataMatricula }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
