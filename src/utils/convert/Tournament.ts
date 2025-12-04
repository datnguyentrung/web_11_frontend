import type { Tournament as TournamentType } from '@/types/tournament/TournamentType';
import type { TournamentScopeKey, TournamentStateKey } from '@/enums/Tournament';

interface TournamentData {
    idTournament: string;
    tournamentName: string;
    tournamentDate: string;
    location: string | null;
    tournamentScope: string;
    tournamentState: string;
}

export const toTournament = (data: TournamentData): TournamentType => {
    return {
        idTournament: data.idTournament,
        tournamentName: data.tournamentName,
        tournamentDate: new Date(data.tournamentDate),
        location: data.location,
        tournamentScope: data.tournamentScope as TournamentScopeKey,
        tournamentState: data.tournamentState as TournamentStateKey
    };
}