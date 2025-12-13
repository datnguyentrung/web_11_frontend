import type { TournamentScopeKey, TournamentStateKey } from "@/enums/Tournament";
import type { NodeInfo } from "./SigmaType";
import type { PersonalInfo } from "@/types/training/StudentType";

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

export interface HistoryInfo extends NodeInfo {
    idHistory: string;
    hasWon: boolean;
    student: PersonalInfo;
}