import type { PoomsaeModeKey } from "@/enums/Tournament";
import type { AgeGroupDTO, BeltGroupDTO } from "@/types/training/StudentType";

export interface CreateRequest {
    idTournament: string;
    idPoomsaeContent: number[];
    idBeltGroup: number[];
    idAgeGroup: number[];
}

export interface CombinationDetail {
    idPoomsaeCombination: string;
    idTournament: string;
    poomsaeContentName: string;
    beltGroupDTO: BeltGroupDTO;
    ageGroupDTO: AgeGroupDTO;
    poomsaeMode: PoomsaeModeKey;
}

export interface CheckModeResponse {
    exists: boolean;
    poomsaeMode: PoomsaeModeKey | null;
}