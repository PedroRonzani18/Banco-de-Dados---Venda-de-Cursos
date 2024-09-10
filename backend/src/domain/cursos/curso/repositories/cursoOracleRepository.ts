import { oracleConnection } from "@/core/db/oracle";
import { CursoProps, Curso, UpdateCursoProps } from "../../@entities/curso";
import { CursosRepository } from "./cursoInterfaceRepository";

export class CursosOracleRepository implements CursosRepository {
    async create(data: CursoProps): Promise<Curso> {

        await oracleConnection.execute(`INSERT INTO ECLBDIT215.CURSO(NOME, DESCRICAO, CARGAHORARIA, PRECO, DATACADASTRO, IDUSUARIO, IMAGEM) VALUES ('${data.nome}', '${data.descricao}', ${data.cargaHora}, ${data.preco}, TO_DATE('${data.dataCadastro.toISOString().slice(0, 10)}', 'YYYY-MM-DD'), ${data.usuarioId}, '${data.imagem}')`)

        await oracleConnection.commit()

        const result = await oracleConnection.execute(`SELECT IDCURSO from ECLBDIT215.CURSO WHERE NOME = '${data.nome}' AND DESCRICAO = '${data.descricao}' AND CARGAHORARIA = ${data.cargaHora} AND PRECO = ${data.preco} AND DATACADASTRO = TO_DATE('${data.dataCadastro.toISOString().slice(0, 10)}', 'YYYY-MM-DD') AND IDUSUARIO = ${data.usuarioId} AND IMAGEM = '${data.imagem}'`)

        const id = (result.rows as any[][])?.[0]?.[0];

        return new Curso(data, id)
    }
    findByNome(titulo: string): Promise<Curso | null> {
        throw new Error("Method not implemented.");
    }

    async findById(id: number): Promise<Curso | null> {

        const response = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.CURSO WHERE IDCURSO = ${id}`)
        if (response.rows?.length === 0)
            return null

        const row = response.rows?.[0]

        const map : Map<string, any> = new Map()

        for (let j = 0; j < (response.metaData?.length ?? 0); j++)
            map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

        return new Curso({
            cargaHora: map.get('CARGAHORARIA'),
            dataCadastro: map.get('DATACADASTRO'),
            descricao: map.get('DESCRICAO'),
            nome: map.get('NOME'),
            preco: map.get('PRECO'),
            usuarioId: map.get('IDUSUARIO'),
            imagem: map.get('IMAGEM')
        }, map.get('IDCURSO'))

    }

    async listById(id: number): Promise<Curso[]> {
        const result = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.CURSO WHERE IDUSUARIO = ${id}`)

        const users: Curso[] = []

        for (const row of result.rows ?? []) {

            const map : Map<string, any> = new Map()

            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

            users.push(new Curso({
                cargaHora: map.get('CARGAHORARIA'),
                dataCadastro: map.get('DATACADASTRO'),
                descricao: map.get('DESCRICAO'),
                nome: map.get('NOME'),
                preco: map.get('PRECO'),
                usuarioId: map.get('IDUSUARIO'),
                imagem: map.get('IMAGEM')
            }, map.get('IDCURSO')))
        }

        return users
    }

    async list(): Promise<Curso[]> {
        const result = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.CURSO`)

        const users: Curso[] = []

        for (const row of result.rows ?? []) {

            const map : Map<string, any> = new Map()

            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

            users.push(new Curso({
                cargaHora: map.get('CARGAHORARIA'),
                dataCadastro: map.get('DATACADASTRO'),
                descricao: map.get('DESCRICAO'),
                nome: map.get('NOME'),
                preco: map.get('PRECO'),
                usuarioId: map.get('IDUSUARIO'),
                imagem: map.get('IMAGEM')
            }, map.get('IDCURSO')))
        }

        return users
    }
    delete(id: number): Promise<Curso | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateCursoProps): Promise<Curso | null> {
        throw new Error("Method not implemented.");
    }
}
