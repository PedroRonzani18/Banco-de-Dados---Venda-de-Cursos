import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export type UpdateUserProps = {
    nome?: string
    telefone?: string
    email?: string
    senha?: string
    login?: string
};

export type UserProps = {
    nome: string
    telefone: string
    email: string
    senha: string
    login: string
};

export class User extends Entity<UserProps> {

    constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id)
    }

    get nome() { return this.nome }
    get telefone() { return this.telefone }
    get email() { return this.email }
    get senha() { return this.senha }
    get login() { return this.login }
}
