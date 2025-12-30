import { endpoints } from '@/api/endpoints';
import axiosInstance from '@/api/axiosInstance';
import type { CompetitorInputDTO } from '@/types/achievement/Competitor';

export const getSparringListByFilter = async (
    idTournament: string,
    idCombination: string,
    idBranch?: number,
    idAccount?: string
) => {
    try {
        const response = await axiosInstance.get(endpoints.sparringList.byFilter, {
            params: {
                idTournament,
                idCombination,
                idBranch,
                idAccount
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch sparring list by filter:", error);
        throw error;
    }
}

export const createSparringList = async (competitorInputs: CompetitorInputDTO) => {
    try {
        const response = await axiosInstance.post(endpoints.sparringList.create, competitorInputs);
        return response.data;
    } catch (error) {
        console.error("Failed to create sparring list:", error);
        throw error;
    }
}