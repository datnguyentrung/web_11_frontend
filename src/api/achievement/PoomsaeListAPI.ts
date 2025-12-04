// import { endpoints } from '@/api/endpoints';
// import axiosInstance from '@/api/axiosInstance';

import { fetchGetPoomsaeListByFilter } from '@/json/PoomsaeList'

export const getPoomsaeListByFilter = async (
    idTournament: string,
    idCombination: string,
    idBranch: number | null,
    idAccount: string | null
) => {
    try {
        // const response = await axiosInstance.get(endpoints.poomsaeList.byFilter, {
        //     params: {
        //         idTournament,
        //         idCombination,
        //         idBranch,
        //         idAccount
        //     }
        // });
        // return response.data.data;
        return fetchGetPoomsaeListByFilter.data;
    } catch (error) {
        console.error("Failed to fetch poomsae list by filter:", error);
        throw error;
    }
}