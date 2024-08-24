import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type UpdateAlternativaProps = {
    idAtividade?: number
    numAtividade?: number
    certa?: boolean
    descricao?: string
};

export type AlternativaProps = {
    idAtividade: number
    numAtividade: number
    certa: boolean
    descricao: string
};

export class Alternativa extends Entity<AlternativaProps> {

    constructor(props: AlternativaProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get idAtividade() { return this.props.idAtividade }
    get numAtividade() { return this.props.numAtividade }
    get certa() { return this.props.certa }
    get descricao() { return this.props.descricao }

    toJSON() {
        return {
            ...super.toJSON(),
            ...this.data
        };
    }
}
