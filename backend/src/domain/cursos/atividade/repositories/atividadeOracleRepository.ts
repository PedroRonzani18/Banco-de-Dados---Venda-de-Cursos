import { oracleConnection } from "@/core/db/oracle";
import { AtividadeProps, Atividade, UpdateAtividadeProps } from "../../@entities/atividade";
import { AtividadesRepository } from "./atividadeInterfaceRepository";

export class AtividadesOracleRepository implements AtividadesRepository {
    async create(idAula: number, data: AtividadeProps): Promise<Atividade> {

        await oracleConnection.execute(`
            INSERT INTO ECLBDIT215.ATIVIDADE(ENUNCIADO, TITULO, IDAULA, NUMERO) VALUES ('${data.enunciado}', '${data.titulo}', ${idAula}, 0)
        `); 

        await oracleConnection.commit();

        const result = await oracleConnection.execute(`SELECT IDATIVIDADE FROM ECLBDIT215.ATIVIDADE WHERE ENUNCIADO = '${data.enunciado}' AND TITULO = '${data.titulo}' AND IDAULA = ${idAula}`);

        const id = (result.rows as any[][])?.[0]?.[0];

        return new Atividade(data, id);
    }
    async findByTituloIdAula(titulo: string, idAula: number): Promise<Atividade | null> {

        const response = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.ATIVIDADE WHERE TITULO = '${titulo}' AND IDAULA = ${idAula}`);

        if (response.rows?.length === 0)
            return null;

        const row = response.rows?.[0];

        const map: Map<string, any> = new Map();

        for (let j = 0; j < (response.metaData?.length ?? 0); j++)
            map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

        return new Atividade({
            enunciado: map.get('ENUNCIADO'),
            titulo: map.get('TITULO'),
            idAula: map.get('IDAULA'),
        }, map.get('IDATIVIDADE'));
    }
    async findById(id: number): Promise<Atividade | null> {

        const response = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.ATIVIDADE WHERE IDATIVIDADE = ${id}`);

        if (response.rows?.length === 0)
            return null;

        const row = response.rows?.[0];

        const map: Map<string, any> = new Map();

        for (let j = 0; j < (response.metaData?.length ?? 0); j++)
            map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

        return new Atividade({
            enunciado: map.get('ENUNCIADO'),
            titulo: map.get('TITULO'),
            idAula: map.get('IDAULA'),
        }, map.get('IDATIVIDADE'));
    }

    async list(): Promise<Atividade[]> {
        
        const response = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.ATIVIDADE`);

        const atividades: Atividade[] = [];

        for (let i = 0; i < (response.rows?.length ?? 0); i++) {
            const row = response.rows?.[i];

            const map: Map<string, any> = new Map();

            for (let j = 0; j < (response.metaData?.length ?? 0); j++)
                map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

            atividades.push(new Atividade({
                enunciado: map.get('ENUNCIADO'),
                idAula: map.get('IDAULA'),
                titulo: map.get('TITULO'),
            }, map.get('IDATIVIDADE')));

        }

        return atividades;
    }

    async delete(id: number): Promise<Atividade | null> {

        const atividade = await this.findById(id);

        if (!atividade)
            return null;

        await oracleConnection.execute(`DELETE FROM ECLBDIT215.ATIVIDADE WHERE IDATIVIDADE = ${id}`);

        await oracleConnection.commit();

        return atividade;
    }

    async update(id: number, data: UpdateAtividadeProps): Promise<Atividade | null> {

        let query = `UPDATE ECLBDIT215.ATIVIDADE SET `;

        if (data.enunciado)
            query += `ENUNCIADO = '${data.enunciado}', `;

        if (data.titulo) 
            query += `TITULO = '${data.titulo}', `;

        if (data.idAula) 
            query += `IDAULA = ${data.idAula}, `;

        query = query.slice(0, -2);

        query += ` WHERE IDATIVIDADE = ${id}`;

        await oracleConnection.execute(query);

        await oracleConnection.commit();

        return this.findById(id);
    }
}
