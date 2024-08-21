import { prisma } from "@/core/db/prisma";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { IslandProps, Island, UpdateIslandProps } from "../../@entities/island";
import { IslandsRepository } from "./islandInterfaceRepository";
import { Optional } from "@/core/types/optional";

export class IslandsPrismaRepository implements IslandsRepository {

    async countIslandsInTrail(trailId: string): Promise<number> {
        
        return await prisma.island.count({
            where: { trailId }
        });
    }

    async list(): Promise<Island[]> {
        const islands = await prisma.island.findMany();

        return islands.map(island => new Island(island, new UniqueEntityID(island.id)));
    }

    async listByTrailId(trailId: string): Promise<Island[]> {
        const islands = await prisma.island.findMany({
            where: { trailId }
        });

        return islands.map(island => new Island(island, new UniqueEntityID(island.id)));
    }

    async create(data: IslandProps): Promise<Island> {

        const { levels, ...restData } = data;

        const island = await prisma.island.create({ data: restData });

        return new Island(island, new UniqueEntityID(island.id))
    }

    async findById(id: string): Promise<Island | null> {
        const island = await prisma.island.findUnique({
            where: { id }
        });

        return (island ? new Island(island, new UniqueEntityID(island.id)) : null);
    }

    async findByIslandName_TrailId(islandName: string, trailId: string): Promise<Island | null> {

        const island = await prisma.island.findUnique({
            where: {
              unique_trailId_name: {
                trailId: trailId,
                name: islandName
              }
            }
          });

        return (island ? new Island(island, new UniqueEntityID(island.id)) : null);
    }

    async delete(id: string): Promise<Island | null> {
        const island = await prisma.island.delete({
            where: { id }
        });

        return (island ? new Island(island, new UniqueEntityID(island.id)) : null);
    }

    async update(id: string, data: UpdateIslandProps): Promise<Island | null> {
        
        const island = await prisma.island.update({
            where: { id },
            data
        });

        return (island ? new Island(island, new UniqueEntityID(island.id)) : null);
    }
}

