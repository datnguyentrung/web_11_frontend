import { endpoints } from '@/api/endpoints';
import axiosInstance from '@/api/axiosInstance';
import type { CheckModeResponse } from '@/types/tournament/PoomsaeCombinationType';

import { filterPoomsaeHistoriesData } from '@/json/PoomsaeHistoryData';

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

export const checkModePoomsaeHistoryExistence = async (
    idTournament: string,
    idCombination: string,
    idAccount?: string
): Promise<CheckModeResponse> => {
    try {
        // const response = await axiosInstance.get(endpoints.poomsaeHistory.checkExistence, {
        //     params: {
        //         idTournament,
        //         idCombination,
        //         idAccount
        //     }
        // });
        // return response.data.data;
        return {
            "exists": true,
            "poomsaeMode": "ELIMINATION"
        };
    } catch (error) {
        console.error('Error checking existence of poomsae history by filter:', error);
        throw error;
    }
}

export const createPoomsaeEliminationWinner = async (winnerId: string) => {
    console.log("Creating poomsae elimination winner with ID:", winnerId);
    try {
        const response = await axiosInstance.post(endpoints.poomsaeHistory.createWinnerForElimination(winnerId));
        return response.data.data;
    } catch (error) {
        console.error('Error creating poomsae elimination winner:', error);
        throw error;
    }
}

export const deletePoomsaeHistoryForElimination = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`${endpoints.poomsaeHistory.createForElimination}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting poomsae history for elimination:', error);
        throw error;
    }
}

export const filterPoomsaeHistories = async (idTournament: string, idCombination: string, idAccount: string | null) => {
    try {
        const response = await axiosInstance.get(endpoints.poomsaeHistory.filter, {
            params: {
                idTournament,
                idCombination,
                idAccount
            }
        });
        return response.data.data;
        // return filterPoomsaeHistoriesData;
    } catch (error) {
        console.error('Error filtering poomsae histories:', error);
        throw error;
    }
}