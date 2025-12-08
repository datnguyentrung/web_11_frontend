import type { Student } from "../training/StudentType";

export interface CompetitorInputDTO {
    idAccounts: string[];
    competition: CompetitionDTO;
}

export interface CompetitorDetailDTO {
    personalAcademicInfo: Student;
    medal: string | null;
    competition: CompetitionDTO;
}

export interface CompetitionDTO {
    idTournament: string;
    idCombination: string;
}

export interface CompetitorBaseDTO {
    idCompetitor: string;
    competitorDetailDTO: CompetitorDetailDTO;
}