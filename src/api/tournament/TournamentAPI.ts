// import { endpoints } from '@/api/endpoints';
// import axiosInstance from '@/api/axiosInstance';
import { toTournament } from '@/utils/convert/Tournament';
import { fetchGetAllTournaments, fetchGetTournamentById } from '@/json/TournamentData';

export const getAllTournaments = async () => {
    try {
        // const response = await axiosInstance.get(endpoints.tournaments.list);
        // return response.data.data;

        return fetchGetAllTournaments.data.map(t => toTournament(t));
    } catch (error) {
        console.error("Error fetching tournaments:", error);
        throw error;
    }
}

export const getTournamentById = async (idTournament: string) => {
    try {
        // const response = await axiosInstance.get(endpoints.tournaments.details(idTournament));
        // return response.data.data;

        return toTournament(fetchGetTournamentById.data);
    } catch (error) {
        console.error(`Error fetching tournament with ID ${idTournament}:`, error);
        throw error;
    }
}