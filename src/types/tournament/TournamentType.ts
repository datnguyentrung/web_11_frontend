import type {
  TournamentScopeKey,
  TournamentStateKey,
} from "@/enums/Tournament";
import type { PersonalInfo } from "@/types/training/StudentType";
import type { NodeInfo } from "./SigmaType";

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
  hasWon: boolean | null;
  student: PersonalInfo;
}
