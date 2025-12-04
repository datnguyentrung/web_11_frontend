import { endpoints } from '@/api/endpoints';
import axiosInstance from '@/api/axiosInstance';

export const getSparringListByFilter = async (
    idTournament: string,
    idCombination: string,
    idBranch: number | null,
    idAccount: string | null
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