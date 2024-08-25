import { AulaAssistida, AulaAssistidaProps, UpdateAulaAssistidaProps } from "../../@entities/aulaAssistida"

export interface AulaAssistidasRepository {
    create(data: AulaAssistidaProps): Promise<AulaAssistida>
    findByIdAulaAssistida(idAula: number, idUsuario: number): Promise<AulaAssistida | null>
    findById(id: number): Promise<AulaAssistida | null>
    list(): Promise<AulaAssistida[]>
    delete(id: number): Promise<AulaAssistida | null>
    update(id: number, data: UpdateAulaAssistidaProps): Promise<AulaAssistida | null>
}