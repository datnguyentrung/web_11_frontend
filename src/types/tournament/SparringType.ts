import type { NodeInfo, ReferenceInfo } from "@/types/tournament/SigmaType";
import type { AgeGroupDTO } from "../training/StudentType";
import type { CompetitorDetailDTO } from "../achievement/Competitor";

export interface SparringContent {
    idSparringContent: number;
    weightClass: string;
    isActive: boolean;
}

export interface SparringCombination {
    idSparringCombination: string;
    sparringContent: SparringContent;
    ageGroup: AgeGroupDTO;
    gender: string;
    active: boolean;
}

export interface SparringList {
    idSparringList: string;
    competitor: CompetitorDetailDTO;
}

export interface SparringHistory {
    idSparringHistory: string;
    nodeInfo: NodeInfo;
    referenceInfo: ReferenceInfo;
    hasWon?: boolean;
}

export interface SparringCategory {
    ageGroupName: string;
    gender: string;
    weightClass: number;
}