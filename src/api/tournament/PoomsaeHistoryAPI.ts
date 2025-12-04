import { endpoints } from '@/api/endpoints';
import axiosInstance from '@/api/axiosInstance';

export const createPoomsaeHistoryForElimination = async (competitorList: string[]) => {
    try {
        console.log('Creating poomsae history for elimination with competitors:', competitorList);
        const response = await axiosInstance.post(endpoints.poomsaeHistory.createForElimination,
            competitorList
        );
        return response.data.data;
    } catch (error) {
        console.error('Error creating poomsae history for elimination:', error);
        throw error;
    }
}

export const existPoomsaeHistoryByFilter = async (
    idTournament: string,
    idCombination: string,
    idAccount: string | null
): Promise<boolean> => {
    try {
        const response = await axiosInstance.get(endpoints.poomsaeHistory.existByFilter, {
            params: {
                idTournament,
                idCombination,
                idAccount
            }
        });
        return response.data.data as boolean;
    } catch (error) {
        console.error('Error checking existence of poomsae history by filter:', error);
        throw error;
    }
}