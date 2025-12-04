import type { Student } from "../training/StudentType";

export interface CompetitorInputDTO {
    idAccount: string;
    medal: string | null;
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