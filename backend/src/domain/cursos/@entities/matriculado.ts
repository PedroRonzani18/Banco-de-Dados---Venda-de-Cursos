import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type UpdateMatriculadoProps = {
    usuarioId?: number
    cursoId?: number
    dataMatricula?: string
};

export type MatriculadoProps = {
    usuarioId: number
    cursoId: number
    dataMatricula: Date
};

export class Matriculado extends Entity<MatriculadoProps> {

    constructor(props: MatriculadoProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get usuarioId() { return this.props.usuarioId }
    get cursoId() { return this.props.cursoId }
    get dataMatricula() { return this.props.dataMatricula }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
