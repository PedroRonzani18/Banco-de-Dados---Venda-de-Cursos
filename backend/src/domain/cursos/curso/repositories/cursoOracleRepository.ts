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

    async findByNome(titulo: string): Promise<Curso | null> {

        const response = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.CURSO WHERE NOME = '${titulo}'`)
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

    async listCoursesNotEnrolledToUser(id: number): Promise<Curso[]> {

        // nao estou matriculado e nao sou dono
        const result = await oracleConnection.execute(`
            select * from ECLBDIT215.curso c
            where c.idcurso not in (
            select m.idcurso from ECLBDIT215.matriculado m where m.idusuario = ${id}
            ) and c.idusuario <> ${id}
        `)

        const cursos: Curso[] = []

        for (const row of result.rows ?? []) {

            const map : Map<string, any> = new Map()

            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

            cursos.push(new Curso({
                cargaHora: map.get('CARGAHORARIA'),
                dataCadastro: map.get('DATACADASTRO'),
                descricao: map.get('DESCRICAO'),
                nome: map.get('NOME'),
                preco: map.get('PRECO'),
                usuarioId: map.get('IDUSUARIO'),
                imagem: map.get('IMAGEM')
            }, map.get('IDCURSO')))
        }

        return cursos
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

    async listCoursesEnrolledToUser(id: number): Promise<Curso[]> {

        const result = await oracleConnection.execute(`
            select * 
            from ECLBDIT215.curso c 
            join ECLBDIT215.matriculado m 
            on c.idcurso = m.idcurso 
            where m.idusuario = ${id} and c.idcurso <> ${id}`
        )

        console.log(123)

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

        console.log(123)

        return users
    }

    async listProfessoresFromCurso(id: number): Promise<string[]> {
        
        const result = await oracleConnection.execute(`
            select prof.nome as NOME
            from ECLBDIT215.professor prof
            join ECLBDIT215.topicoprofessor tp on prof.idprofessor = tp.idprofessor
            join ECLBDIT215.topico topic on topic.idtopico = tp.idtopico
            join ECLBDIT215.curso cu on topic.idcurso = cu.idcurso
            where cu.idcurso = ${id}
        `)

        const professores: string[] = []

        for (const row of result.rows ?? []) {

            const map : Map<string, any> = new Map()

            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

            professores.push(map.get('NOME'))
        }

        return professores
    }

    async listTemasFromCurso(id: number): Promise<string[]> {
        
        const result = await oracleConnection.execute(`
            select t.nome
            from ECLBDIT215.tema t
            join ECLBDIT215.topicotema tt on t.idtema = tt.idtema
            join ECLBDIT215.topico top on top.idtopico = tt.idtopico
            join ECLBDIT215.curso c on top.idcurso = c.idcurso
            where c.idcurso = ${id}
        `)

        console.dir({result: result.rows}, {depth: null})

        const temas: string[] = []

        for (const row of result.rows ?? []) {

            const map : Map<string, any> = new Map()

            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

            temas.push(map.get('NOME'))
        }

        return temas
    }

    async delete(id: number): Promise<void> {

        await oracleConnection.execute(`DELETE FROM ECLBDIT215.CURSO WHERE IDCURSO = ${id}`)
    }

    async update(id: number, data: UpdateCursoProps): Promise<Curso | null> {

        let updateQuery = `UPDATE ECLBDIT215.CURSO SET`;

        if (data.nome) updateQuery += ` NOME = '${data.nome}',`;
        if (data.descricao) updateQuery += ` DESCRICAO = '${data.descricao}',`;
        if (data.cargaHora) updateQuery += ` CARGAHORARIA = ${data.cargaHora},`;
        if (data.preco) updateQuery += ` PRECO = ${data.preco},`;
        if (data.dataCadastro) updateQuery += ` DATACADASTRO = TO_DATE('${data.dataCadastro.toISOString().slice(0, 10)}', 'YYYY-MM-DD'),`;
        if (data.usuarioId) updateQuery += ` IDUSUARIO = ${data.usuarioId},`;
        if (data.imagem) updateQuery += ` IMAGEM = '${data.imagem}',`;

        updateQuery = updateQuery.slice(0, -1);
        updateQuery += ` WHERE IDCURSO = ${id}`;

        await oracleConnection.execute(updateQuery);
        await oracleConnection.commit()

        return this.findById(id)
    }
}
