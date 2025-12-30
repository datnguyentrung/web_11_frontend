// import { endpoints } from '@/api/endpoints';
// import axiosInstance from '@/api/axiosInstance';

import { fetchGetPoomsaeListByFilter } from '@/json/PoomsaeList'
import type { CompetitorInputDTO } from '@/types/achievement/Competitor';

export const getPoomsaeListByFilter = async (
    idTournament: string,
    idCombination: string,
    idBranch?: number,
    idAccount?: string
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

export const createPoomsaeList = async (competitorInputs: CompetitorInputDTO) => {
    try {
        // const response = await axiosInstance.post(endpoints.poomsaeList.create, competitorInputs);
        // console.log("Poomsae list created successfully:", response.data);
        return "All Poomsae lists created successfully";
    } catch (error) {
        console.error("Failed to create poomsae list:", error);
        throw error;
    }
}