import { oracleConnection } from "@/core/db/oracle";
import { AulaProps, Aula, UpdateAulaProps } from "../../@entities/aula";
import { AulasRepository } from "./aulaInterfaceRepository";

export class AulasOracleRepository implements AulasRepository {
    async create(idTopico: number, data: AulaProps): Promise<Aula> {

        await oracleConnection.execute(`
            INSERT INTO ECLBDIT215.AULA(TITULO, DURACAOESTIMADA, DESCRICAO, URLVIDEO, IDTOPICO, NUMERO) VALUES ('${data.titulo}', ${data.duracaoEstimada}, '${data.descricao}', '${data.urlVideo}', ${idTopico}, ${data.index})
        `);

        await oracleConnection.commit();

        const result = await oracleConnection.execute(`
            SELECT IDAULA FROM ECLBDIT215.AULA WHERE TITULO = '${data.titulo}' AND IDTOPICO = ${idTopico}
        `);

        const id = (result.rows as any[][])?.[0]?.[0];

        return new Aula(data, id);
    }
    findByTituloIdCurso(titulo: string, idAula: number): Promise<Aula | null> {
        throw new Error("Method not implemented.");
    }
    
    async findById(id: number): Promise<Aula | null> {

        const response = await oracleConnection.execute(`
            SELECT * FROM ECLBDIT215.AULA WHERE IDAULA = ${id}
        `);

        if (response.rows?.length === 0)
            return null;

        const row = response.rows?.[0];

        const map : Map<string, any> = new Map();

        for (let j = 0; j < (response.metaData?.length ?? 0); j++)
            map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

        return new Aula({
            descricao: map.get('DESCRICAO'),
            duracaoEstimada: map.get('DURACAOESTIMADA'),
            idTopico: map.get('IDTOPICO'),
            index: map.get('INDEX'),
            titulo: map.get('TITULO'),
            urlVideo: map.get('URLVIDEO') ?? ''
        }, map.get('IDAULA'));
    }

    async list(): Promise<Aula[]> {

        const response = await oracleConnection.execute(`
            SELECT * FROM ECLBDIT215.AULA
        `);

        const aulas: Aula[] = [];

        for (let i = 0; i < (response.rows?.length ?? 0); i++) {

            const row = response.rows?.[i];

            const map : Map<string, any> = new Map();

            for (let j = 0; j < (response.metaData?.length ?? 0); j++)
                map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

            aulas.push(new Aula({
                descricao: map.get('DESCRICAO'),
                duracaoEstimada: map.get('DURACAOESTIMADA'),
                idTopico: map.get('IDTOPICO'),
                index: map.get('INDEX'),
                titulo: map.get('TITULO'),
                urlVideo: map.get('URLVIDEO') ?? ''
            }, map.get('IDAULA')));
        }

        return aulas;
    }
    delete(id: number): Promise<Aula | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateAulaProps): Promise<Aula | null> {
        throw new Error("Method not implemented.");
    }
}
