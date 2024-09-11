import { oracleConnection } from "@/core/db/oracle";
import { ProfessorProps, Professor, UpdateProfessorProps } from "../../@entities/professor";
import { ProfessorsRepository } from "./professorInterfaceRepository";

export class ProfessorsOracleRepository implements ProfessorsRepository {
    async create(data: ProfessorProps): Promise<Professor> {

        await oracleConnection.execute(`INSERT INTO ECLBDIT215.PROFESSOR(NOME) VALUES ('${data.nome}')`)
        await oracleConnection.commit()

        const idProfessor = await oracleConnection.execute(`SELECT IDPROFESSOR FROM ECLBDIT215.PROFESSOR WHERE NOME = '${data.nome}'`)
        const id = (idProfessor.rows as any[][])?.[0]?.[0];

        return new Professor(data, id)
    }

    async findByNome(nome: string): Promise<Professor | null> {

        const result = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.PROFESSOR WHERE NOME = '${nome}'`)

        if (result.rows?.length === 0)
            return null

        const row = result.rows?.[0]

        const map : Map<string, any> = new Map()

        for (let j = 0; j < (result.metaData?.length ?? 0); j++)
            map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

        return new Professor({
            nome: map.get('NOME')
        }, map.get('IDPROFESSOR')) 
    }

    async findById(id: number): Promise<Professor | null> {

        const result = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.PROFESSOR WHERE IDPROFESSOR = ${id}`)

        if (result.rows?.length === 0)
            return null

        const row = result.rows?.[0]

        const map : Map<string, any> = new Map()

        for (let j = 0; j < (result.metaData?.length ?? 0); j++)
            map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

        return new Professor({
            nome: map.get('NOME')
        }, map.get('IDPROFESSOR'))
    }

    async list(): Promise<Professor[]> {

        const result = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.PROFESSOR`)

        const professors: Professor[] = []

        for (const row of result.rows ?? []) {

            const map : Map<string, any> = new Map()

            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

            professors.push(new Professor({
                nome: map.get('NOME')
            }))
        }

        return professors
    }
    async delete(id: number): Promise<void> {

        await oracleConnection.execute(`SELECT * FROM ECLBDIT215.PROFESSOR WHERE IDPROFESSOR = ${id}`)
    }

    async update(id: number, data: UpdateProfessorProps): Promise<Professor | null> {

        await oracleConnection.execute(`UPDATE ECLBDIT215.PROFESSOR SET NOME = '${data.nome}' WHERE IDPROFESSOR = ${id}`)

        await oracleConnection.commit()

        return this.findById(id)
    }
}
