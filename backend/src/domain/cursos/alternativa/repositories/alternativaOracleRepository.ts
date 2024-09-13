import { oracleConnection } from "@/core/db/oracle";
import { AlternativaProps, Alternativa, UpdateAlternativaProps } from "../../@entities/alternativa";
import { AlternativasRepository } from "./alternativaInterfaceRepository";

export class AlternativasOracleRepository implements AlternativasRepository {
    async create(id: number, data: AlternativaProps): Promise<Alternativa> {

        await oracleConnection.execute(`INSERT INTO ECLBDIT215.ALTERNATIVA(NUMALTERNATIVA, CERTA, DESCRICAO, IDATIVIDADE) VALUES (${data.numAtividade}, ${data.certa ? 1 : 0}, '${data.descricao}', ${id})`);

        await oracleConnection.commit();

        return new Alternativa(data);
    }
    
    async findByNumeroAtividadeId(numeroAtividade: number, idAtividade: number): Promise<Alternativa | null> {

        const response = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.ALTERNATIVA WHERE NUMALTERNATIVA = ${numeroAtividade} AND IDATIVIDADE = ${idAtividade}`);
        if (response.rows?.length === 0)
            return null;

        const row = response.rows?.[0];

        const map : Map<string, any> = new Map();

        for (let j = 0; j < (response.metaData?.length ?? 0); j++)
            map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

        return new Alternativa({
            numAtividade: map.get('NUMALTERNATIVA'),
            certa: map.get('CERTA') === 1,
            descricao: map.get('DESCRICAO'),
            idAtividade: map.get('IDATIVIDADE')
        });
    }

    async findById(id: number): Promise<Alternativa | null> {

        const response = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.ALTERNATIVA WHERE IDALTERNATIVA = ${id}`);
        if (response.rows?.length === 0)
            return null;

        const row = response.rows?.[0];

        const map : Map<string, any> = new Map();

        for (let j = 0; j < (response.metaData?.length ?? 0); j++)
            map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

        return new Alternativa({
            numAtividade: map.get('NUMALTERNATIVA'),
            certa: map.get('CERTA') === 1,
            descricao: map.get('DESCRICAO'),
            idAtividade: map.get('IDATIVIDADE')
        });
    }

    async list(): Promise<Alternativa[]> {

        const response = await oracleConnection.execute(`SELECT * FROM ECLBDIT215.ALTERNATIVA`);

        console.dir({data: response.rows}, {depth: null});

        const alternativas: Alternativa[] = [];

        for (let i = 0; i < (response.rows?.length ?? 0); i++) {
            const row = response.rows?.[i];

            const map : Map<string, any> = new Map();

            for (let j = 0; j < (response.metaData?.length ?? 0); j++)
                map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

            alternativas.push(new Alternativa({
                numAtividade: map.get('NUMALTERNATIVA'),
                certa: map.get('CERTA') === '1',
                descricao: map.get('DESCRICAO'),
                idAtividade: map.get('IDATIVIDADE')
            }));
        }

        console.log('AlternativasOracleRepository.list()');
        console.dir({alternativas}, {depth: null});

        return alternativas;
    }

    async delete(id: number): Promise<Alternativa | null> {

        const alternativa = await this.findById(id);

        if (alternativa === null)
            return null;

        await oracleConnection.execute(`DELETE FROM ECLBDIT215.ALTERNATIVA WHERE IDALTERNATIVA = ${id}`);

        await oracleConnection.commit();

        return alternativa;
    }

    async update(id: number, data: UpdateAlternativaProps): Promise<Alternativa | null> {

        let updateQuery = 'UPDATE ECLBDIT215.ALTERNATIVA SET ';

        if (data.numAtividade) updateQuery += `NUMALTERNATIVA = ${data.numAtividade},`;
        if (data.certa !== undefined) updateQuery += `CERTA = ${data.certa ? 1 : 0},`;
        if (data.descricao) updateQuery += `DESCRICAO = '${data.descricao}',`;
        if (data.idAtividade) updateQuery += `IDATIVIDADE = ${data.idAtividade},`;

        updateQuery = updateQuery.slice(0, -1);

        updateQuery += ` WHERE IDALTERNATIVA = ${id}`;

        await oracleConnection.execute(updateQuery);

        await oracleConnection.commit();

        return this.findById(id);
    }
}
