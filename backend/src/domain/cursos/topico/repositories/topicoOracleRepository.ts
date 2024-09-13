import { oracleConnection } from "@/core/db/oracle";
import { TopicoProps, Topico, UpdateTopicoProps } from "../../@entities/topico";
import { TopicosRepository } from "./topicoInterfaceRepository";

export class TopicosOracleRepository implements TopicosRepository {

    async countTopicosFromCurso(cursoId: number): Promise<number> {

        const result = await oracleConnection.execute(`SELECT COUNT(*) FROM ECLBDIT215.TOPICO WHERE IDCURSO = ${cursoId}`)

        return (result.rows as any[][])?.[0]?.[0] ?? 0
    }

    async create(cursoId: number, data: TopicoProps): Promise<Topico> {

        await oracleConnection.execute(`INSERT INTO ECLBDIT215.TOPICO(NUMERO, TITULO, DESCRICAO, IDCURSO) VALUES (${data.index}, '${data.titulo}', '${data.descricao}', '${cursoId}')`)

        await oracleConnection.commit()

        const result = await oracleConnection.execute(`SELECT IDTOPICO FROM ECLBDIT215.TOPICO WHERE TITULO = '${data.titulo}' AND IDCURSO = ${cursoId}`)

        const id = (result.rows as any[][])?.[0]?.[0];

        return new Topico(data, id)
    }

    async findByTituloIdCurso(titulo: string, idAula: number): Promise<Topico | null> {

        const result = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.TOPICO WHERE TITULO = '${titulo}' AND IDCURSO = ${idAula}`)

        if (result.rows?.length === 0)
            return null

        const topico: Topico[] = []

        for (const row of result.rows ?? []) {

            const map: Map<string, any> = new Map()

            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

            topico.push(new Topico({
                cursoId: map.get('IDCURSO'),
                descricao: map.get('DESCRICAO'),
                index: map.get('INDEX'),
                titulo: map.get('TITULO')
            }, map.get('IDTOPICO')))
        }

        return topico[0]
    }

    async findById(id: number): Promise<Topico | null> {

        const result = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.TOPICO WHERE IDTOPICO = ${id}`)

        if (result.rows?.length === 0)
            return null

        const topico: Topico[] = []

        for (const row of result.rows ?? []) {

            const map: Map<string, any> = new Map()

            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

            topico.push(new Topico({
                cursoId: map.get('IDCURSO'),
                descricao: map.get('DESCRICAO'),
                index: map.get('INDEX'),
                titulo: map.get('TITULO')
            }, map.get('IDTOPICO')))
        }

        return topico[0]
    }

    async list(): Promise<Topico[]> {

        const result = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.TOPICO`)

        const topicos: Topico[] = []

        for (const row of result.rows ?? []) {

            const map: Map<string, any> = new Map()

            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

            topicos.push(new Topico({
                cursoId: map.get('IDCURSO'),
                descricao: map.get('DESCRICAO'),
                index: map.get('INDEX'),
                titulo: map.get('TITULO')
            }, map.get('IDTOPICO')))
        }

        return topicos
    }

    async listById(id: number): Promise<Topico[]> {

        const result = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.TOPICO WHERE IDCURSO = ${id}`)

        const topicos: Topico[] = []

        for (const row of result.rows ?? []) {

            const map: Map<string, any> = new Map()

            for (let j = 0; j < (result.metaData?.length ?? 0); j++)
                map.set(result.metaData?.[j].name ?? '', (row as any)[j]);

            topicos.push(new Topico({
                cursoId: map.get('IDCURSO'),
                descricao: map.get('DESCRICAO'),
                index: map.get('INDEX'),
                titulo: map.get('TITULO')
            }, map.get('IDTOPICO')))
        }

        return topicos
    }

    async delete(id: number): Promise<Topico | null> {

        const topico = await this.findById(id)

        if (!topico)
            return null

        await oracleConnection.execute(`DELETE FROM ECLBDIT215.TOPICO WHERE IDTOPICO = ${id}`)

        await oracleConnection.commit()

        return topico
    }

    async update(id: number, data: UpdateTopicoProps): Promise<Topico | null> {

        const topico = await this.findById(id)

        if (!topico)
            return null

        await oracleConnection.execute(`UPDATE ECLBDIT215.TOPICO SET "INDEX" = ${data.index}, TITULO = '${data.titulo}', DESCRICAO = '${data.descricao}' WHERE IDTOPICO = ${id}`)

        await oracleConnection.commit()

        return new Topico({
            cursoId: data.cursoId ?? topico.cursoId,
            descricao: data.descricao ?? topico.descricao,
            index: data.index ?? topico.index,
            titulo: data.titulo ?? topico.titulo
        }, topico.id)
    }
}
