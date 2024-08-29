import { oracleConnection } from "@/core/db/oracle";
import { UserProps, User, UpdateUserProps } from "../../@entities/user";
import { UsersRepository } from "./userInterfaceRepository";

export class UsersOracleRepository implements UsersRepository {

    async create(data: UserProps): Promise<User> {

        await oracleConnection.execute(`INSERT INTO ECLBDIT215.USUARIO(LOGIN, SENHA, EMAIL, TELEFONE, NOME) VALUES ('${data.login}', '${data.senha}', '${data.email}', '${data.telefone}', '${data.nome}')`)

        await oracleConnection.commit()

        return new User(data)
    }

    async findById(id: number): Promise<User | null> {

        const result = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.USUARIO WHERE IDUSUARIO = ${id}`)

        const map : Map<string, any> = new Map()

        for (const row of result.rows ?? [])
            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

        return map.size === 0 ? null : new User({
            login: map.get('LOGIN'),
            senha: map.get('SENHA'),
            email: map.get('EMAIL'),
            telefone: map.get('TELEFONE'),
            nome: map.get('NOME')
        }, map.get('IDUSUARIO'))
    }

    async findByWhereParams(params: Map<string, string>) : Promise<User[]> {

        const result = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.USUARIO WHERE ${Array.from(params).map(([key, value]) => `${key} = '${value}'`).join(' AND ')}`)
        
        const users: User[] = []

        for (const row of result.rows ?? []) {

            const map : Map<string, any> = new Map()

            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

            users.push(new User({
                login: map.get('LOGIN'),
                senha: map.get('SENHA'),
                email: map.get('EMAIL'),
                telefone: map.get('TELEFONE'),
                nome: map.get('NOME')
            }, map.get('IDUSUARIO')))
        }

        return users
    }

    async findByLogin(login: string): Promise<User | null> {

        const result = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.USUARIO WHERE LOGIN = '${login}'`)

        const map : Map<string, any> = new Map()

        for (const row of result.rows ?? [])
            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

        return map.size === 0 ? null : new User({
            login: map.get('LOGIN'),
            senha: map.get('SENHA'),
            email: map.get('EMAIL'),
            telefone: map.get('TELEFONE'),
            nome: map.get('NOME')
        }, map.get('IDUSUARIO'))
    }

    async list(): Promise<User[]> {

        const result = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.USUARIO`)

        const users: User[] = []

        for (const row of result.rows ?? []) {

            const map : Map<string, any> = new Map()

            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

            users.push(new User({
                login: map.get('LOGIN'),
                senha: map.get('SENHA'),
                email: map.get('EMAIL'),
                telefone: map.get('TELEFONE'),
                nome: map.get('NOME')
            }, map.get('IDUSUARIO')))
        }

        return users
    }

    async delete(id: number): Promise<User | null> {
        
        await oracleConnection.execute(`DELETE FROM ECLBDIT215.USUARIO WHERE IDUSUARIO = ${id}`)
        
        await oracleConnection.commit()

        return null;
    }

    async update(id: number, data: UpdateUserProps): Promise<User | null> {

        await oracleConnection.execute(`UPDATE ECLBDIT215.USUARIO SET LOGIN = '${data.login}', SENHA = '${data.senha}', EMAIL = '${data.email}', TELEFONE = '${data.telefone}', NOME = '${data.nome}' WHERE IDUSUARIO = ${id}`)

        await oracleConnection.commit()

        return null;
    }
}

