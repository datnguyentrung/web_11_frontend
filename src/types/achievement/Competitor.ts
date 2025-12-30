import type { PersonalInfo } from "../training/StudentType";

export interface CompetitorInputDTO {
    idAccounts: string[];
    competition: CompetitionDTO;
}

export interface CompetitorDetailDTO {
    idCompetitor: string;
    personalInfo: PersonalInfo;
    medal: string | null;
}

export interface CompetitionDTO {
    idTournament: string;
    idCombination: string;
}

export interface CompetitorBaseDTO {
    competitionDTO: CompetitionDTO;
    competitorDetailDTO: CompetitorDetailDTO[];
}