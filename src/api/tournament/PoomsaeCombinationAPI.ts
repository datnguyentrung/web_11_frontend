import { fetchGetPoomsaeCombinationsByTournament } from '../../json/PoomsaeCombinationData';
import { endpoints } from '@/api/endpoints';
import axiosInstance from '@/api/axiosInstance';
import type { CreateRequest } from '@/types/tournament/PoomsaeCombinationType';

export const getPoomsaeCombinationsByTournament = async (tournamentId: string) => {
    try {
        // const response = await axiosInstance.get(endpoints.poomsaeCombinations.byTournament, {
        //     params: { idTournament: tournamentId }
        // });
        // return response.data.data;
        return fetchGetPoomsaeCombinationsByTournament.data;
    } catch (error) {
        console.error(`Error fetching poomsae combinations for tournament ${tournamentId}:`, error);
        throw error;
    }
}

export const createPoomsaeCombination = async (data: CreateRequest) => {
    try {
        const response = await axiosInstance.post(endpoints.poomsaeCombinations.create, data);
        return response.data.data;
    } catch (error) {
        console.error('Error creating poomsae combination:', error);
        throw error;
    }
}