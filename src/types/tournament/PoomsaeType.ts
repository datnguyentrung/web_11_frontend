import type { NodeInfo, ReferenceInfo } from "@/types/tournament/SigmaType";
import type { AgeGroupDTO, BeltGroupDTO } from "@/types/training/StudentType";
import type { CompetitorDetailDTO } from "@/types/achievement/Competitor";

export interface PoomsaeContent {
    idPoomsaeContent: number;
    contentName: string;
    isActive: boolean;
}

export interface PoomsaeCombination {
    idPoomsaeCombination: string;
    poomsaeContent: PoomsaeContent;
    ageGroup: AgeGroupDTO;
    beltGroup: BeltGroupDTO;
    isActive: boolean;
    poomsaeMode: 'ROUND_ROBIN' | 'ELIMINATION';
}

export interface PoomsaeList {
    idPoomsaeList: string;
    competitor: CompetitorDetailDTO;
}

export interface PoomsaeHistory {
    idPoomsaeHistory: string;
    nodeInfo: NodeInfo;
    referenceInfo: ReferenceInfo;
    hasWon?: boolean;
}

export interface PoomsaeCategory {
    ageGroupName: string;
    beltGroupName: string;
    contentName: string;
}