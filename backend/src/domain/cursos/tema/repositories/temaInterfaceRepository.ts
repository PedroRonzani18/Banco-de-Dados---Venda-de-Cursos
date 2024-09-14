import { Tema, TemaProps, UpdateTemaProps } from "../../@entities/tema"

export interface TemasRepository {
    create(data: TemaProps): Promise<Tema>
    findByNome(nome: string): Promise<Tema | null>
    findById(name: string): Promise<Tema | null>
    list(): Promise<Tema[]>
    delete(id: string): Promise<Tema | null>
    update(id: string, data: UpdateTemaProps): Promise<Tema | null>
    frequenciaTema(): Promise<{nome: string, freq: number}[]>
}