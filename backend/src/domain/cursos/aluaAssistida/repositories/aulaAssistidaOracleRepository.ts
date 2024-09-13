import { oracleConnection } from "@/core/db/oracle";
import { AulaAssistidaProps, AulaAssistida, UpdateAulaAssistidaProps } from "../../@entities/aulaAssistida";
import { AulaAssistidasRepository } from "./aulaAssistidaInterfaceRepository";

export class AulaAssistidasOracleRepository implements AulaAssistidasRepository {
    
    async leftJoin(idUsuario: number, idCurso: number): Promise<{ nome: string; assistido: boolean; }[]> {
        
        const response = await oracleConnection.execute(`
            SELECT a.titulo AS nome_aula, u.nome AS nome_usuario
                FROM ECLBDIT215.aula a
                LEFT JOIN ECLBDIT215.aulaassistida aa ON a.idaula = aa.idaula AND 
                    aa.idusuario = ${idUsuario}
                LEFT JOIN ECLBDIT215.usuario u ON u.idusuario = aa.idusuario
                JOIN ECLBDIT215.topico t ON a.idtopico = t.idtopico
                WHERE t.idcurso = ${idCurso}
        `);

        const aulasAssistidas: { nome: string; assistido: boolean; }[] = [];

        for (let i = 0; i < (response.rows?.length ?? 0); i++) {
            const row = response.rows?.[i];

            const map: Map<string, any> = new Map();

            for (let j = 0; j < (response.metaData?.length ?? 0); j++)
                map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

            aulasAssistidas.push({
                nome: map.get('NOME_AULA'),
                assistido: map.get('NOME_USUARIO') !== null
            });
        }

        return aulasAssistidas;
    }
    
    async create(data: AulaAssistidaProps): Promise<AulaAssistida> {

        const response = await oracleConnection.execute(`
            INSERT INTO ECLBDIT215.AULAASSISTIDA (DATAASSISTIR, IDUSUARIO, IDAULA) VALUES (TO_DATE('${data.dataAssistir.toISOString().slice(0, 10)}', 'YYYY-MM-DD'), ${data.idUsuario}, ${data.idAula})
        `);

        await oracleConnection.commit();

        return new AulaAssistida(data);
    }
    async findByIdAulaAssistida(idAula: number, idUsuario: number): Promise<AulaAssistida | null> {

        const response = await oracleConnection.execute(`
            SELECT * FROM ECLBDIT215.AULAASSISTIDA WHERE IDAULA = ${idAula} AND IDUSUARIO = ${idUsuario}
        `);

        if (response.rows?.length === 0)
            return null;

        const row = response.rows?.[0];

        const map: Map<string, any> = new Map();

        for (let j = 0; j < (response.metaData?.length ?? 0); j++)
            map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

        return new AulaAssistida({
            dataAssistir: map.get('DATAASSISTIR'),
            idUsuario: map.get('IDUSUARIO'),
            idAula: map.get('IDAULA')
        }, map.get('IDASSISTIDA'));
    }

    async findById(id: number): Promise<AulaAssistida | null> {

        const response = await oracleConnection.execute(`
            SELECT * FROM ECLBDIT215.AULAASSISTIDA WHERE IDASSISTIDA = ${id}
        `);

        if (response.rows?.length === 0)
            return null;

        const row = response.rows?.[0];

        const map: Map<string, any> = new Map();

        for (let j = 0; j < (response.metaData?.length ?? 0); j++)
            map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

        return new AulaAssistida({
            dataAssistir: map.get('DATAASSISTIR'),
            idUsuario: map.get('IDUSUARIO'),
            idAula: map.get('IDAULA')
        }, map.get('IDASSISTIDA'));
    }
    
    async list(): Promise<AulaAssistida[]> {

        const response = await oracleConnection.execute(`
            SELECT * FROM ECLBDIT215.AULAASSISTIDA 
        `);

        const aulasAssistidas: AulaAssistida[] = [];

        for (let i = 0; i < (response.rows?.length ?? 0); i++) {
            const row = response.rows?.[i];

            const map: Map<string, any> = new Map();

            for (let j = 0; j < (response.metaData?.length ?? 0); j++)
                map.set(response.metaData?.[j].name ?? '', (row as any)[j]);

            aulasAssistidas.push(new AulaAssistida({
                dataAssistir: map.get('DATAASSISTIR'),
                idUsuario: map.get('IDUSUARIO'),
                idAula: map.get('IDAULA')
            }, map.get('IDASSISTIDA')));
        }

        return aulasAssistidas;
    }
    delete(id: number): Promise<AulaAssistida | null> {
        throw new Error("Method not implemented.3");
    }
    update(id: number, data: UpdateAulaAssistidaProps): Promise<AulaAssistida | null> {
        throw new Error("Method not implemented.4");
    }
}
