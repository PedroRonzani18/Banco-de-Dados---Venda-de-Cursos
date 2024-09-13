import { oracleConnection } from "@/core/db/oracle";
import { AlternativaProps, Alternativa, UpdateAlternativaProps } from "../../@entities/alternativa";
import { AlternativasRepository } from "./alternativaInterfaceRepository";

export class AlternativasOracleRepository implements AlternativasRepository {
    async create(id: number, data: AlternativaProps): Promise<Alternativa> {

        await oracleConnection.execute(` INSERT INTO ECLBDIT215.ALTERNATIVA(NUMALTERNATIVA, CERTA, DESCRICAO, IDATIVIDADE) VALUES (${data.numAtividade}, ${data.certa ? 1 : 0}, '${data.descricao}', ${id})`);

        await oracleConnection.commit();

        return new Alternativa(data);
    }
    
    findByNumeroAtividadeId(numeroAtividade: number, idAtividade: number): Promise<Alternativa | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Alternativa | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Alternativa[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Alternativa | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateAlternativaProps): Promise<Alternativa | null> {
        throw new Error("Method not implemented.");
    }
}
