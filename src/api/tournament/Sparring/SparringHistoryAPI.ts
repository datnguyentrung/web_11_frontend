import { endpoints } from '@/api/endpoints';
import axiosInstance from '@/api/axiosInstance';

export const createSparringHistoryForElimination = async (competitorList: string[]) => {
    try {
        console.log('Creating sparring history for elimination with competitors:', competitorList);
        const response = await axiosInstance.post(endpoints.sparringHistory.create,
            competitorList
        );
        return response.data.data;
    } catch (error) {
        console.error('Error creating sparring history for elimination:', error);
        throw error;
    }
}

export const existSparringHistoryByFilter = async (
    idTournament: string,
    idCombination: string,
    idAccount: string | null
): Promise<boolean> => {
    try {
        // const response = await axiosInstance.get(endpoints.poomsaeHistory.existByFilter, {
        //     params: {
        //         idTournament,
        //         idCombination,
        //         idAccount
        //     }
        // });
        // return response.data.data as boolean;
        return true;
    } catch (error) {
        console.error('Error checking existence of poomsae history by filter:', error);
        throw error;
    }
}

export const createSparringWinner = async (winnerId: string, participants: number) => {
    try {
        const response = await axiosInstance.post(endpoints.sparringHistory.create, {
            params: {
                participants,
                idHistory: winnerId
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error creating sparring elimination winner:', error);
        throw error;
    }
}

export const deleteSparringHistory = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`${endpoints.sparringHistory.delete(id)}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting sparring history for elimination:', error);
        throw error;
    }
}