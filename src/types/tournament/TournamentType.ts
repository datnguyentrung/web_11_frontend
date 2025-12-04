import type { TournamentScopeKey, TournamentStateKey } from "@/enums/Tournament";

export interface Tournament extends TournamentInfo {
    idTournament: string;
}

export interface TournamentInfo {
    tournamentName: string;
    tournamentDate: Date;
    location: string | null;
    tournamentScope: TournamentScopeKey;
    tournamentState: TournamentStateKey;
}