import { oracleConnection } from "@/core/db/oracle";
import { TemaProps, Tema, UpdateTemaProps } from "../../@entities/tema";
import { TemasRepository } from "./temaInterfaceRepository";

export class TemasOracleRepository implements TemasRepository {
    async create(data: TemaProps): Promise<Tema> {

        await oracleConnection.execute(`INSERT INTO ECLBDIT215.TEMA(NOME) VALUES ('${data.nome}')`)

        await oracleConnection.commit()

        const result = await oracleConnection.execute(`SELECT IDTEMA from ECLBDIT215.TEMA WHERE NOME = '${data.nome}'`)

        const id = (result.rows as any[][])?.[0]?.[0];

        return new Tema(data, id)
    }

    async findByNome(nome: string): Promise<Tema | null> {

        const response = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.TEMA WHERE NOME = '${nome}'`)
        if (response.rows?.length === 0)
            return null

        const row = response.rows?.[0]

        const map: Map<string, any> = new Map()

        for (let j = 0; j < (response.metaData?.length ?? 0); j++)
            map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

        return new Tema({
            nome: map.get('NOME')
        }, map.get('IDTEMA'))
    }

    async findById(id: string): Promise<Tema | null> {

        const response = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.TEMA WHERE IDTEMA = ${id}`)
        if (response.rows?.length === 0)
            return null

        const row = response.rows?.[0]

        const map: Map<string, any> = new Map()

        for (let j = 0; j < (response.metaData?.length ?? 0); j++)
            map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

        return new Tema({
            nome: map.get('NOME')
        }, map.get('IDTEMA'))
    }
    async list(): Promise<Tema[]> {

        const result = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.TEMA`)

        const temas: Tema[] = []

        for (const row of result.rows ?? []) {

            const map: Map<string, any> = new Map()

            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

            temas.push(new Tema({
                nome: map.get('NOME')
            }, map.get('IDTEMA')))
        }

        return temas

    }
    async delete(id: string): Promise<Tema | null> {

        const tema = await this.findById(id)
        if (!tema)
            return null

        await oracleConnection.execute(`DELETE FROM ECLBDIT215.TEMA WHERE IDTEMA = ${id}`)

        await oracleConnection.commit()

        return tema
    }

    async update(id: string, data: UpdateTemaProps): Promise<Tema | null> {

        const tema = await this.findById(id)
        if (!tema)
            return null

        let updateQuery = `UPDATE ECLBDIT215.TEMA SET `

        if (data.nome)
            updateQuery += `NOME = '${data.nome}',`

        updateQuery = updateQuery.slice(0, -1)

        updateQuery += ` WHERE IDTEMA = ${id}`
        await oracleConnection.execute(updateQuery)

        await oracleConnection.commit()

        return new Tema({
            nome: data.nome ?? tema.nome
        }, tema.id)
    }
}
