import { endpoints } from '@/api/endpoints';
import axiosInstance from '@/api/axiosInstance';
import type { TournamentMatchDTO } from '@/types/tournament/TournamentMatchType';

export const createTournamentMatch = async (matchData: TournamentMatchDTO) => {
    try {
        const response = await axiosInstance.post(endpoints.tournamentMatch.create, matchData);
        return response.data.data;
    } catch (error) {
        console.error("Error creating tournament match:", error);
        throw error;
    } finally {
        // Optionally, you can add any cleanup or finalization logic here
    }
}