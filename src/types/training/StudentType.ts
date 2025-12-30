import type { BeltLevelKey } from "@/enums/Student";

export interface BeltGroupDTO {
  beltGroupName: string;
  startBelt: BeltLevelKey;
  endBelt: BeltLevelKey;
}

export interface AgeGroupDTO {
  ageGroupName: string;
  minAge: number;
  maxAge: number;
}

export interface PersonalInfo {
  name: string;
  idAccount: string | null;
  idNational: string | null;
  birthDate: Date | string;
  isActive: boolean;
}

export interface AcademicInfo {
  idBranch: number;
  beltLevel: string;
  classSessions: string[];
}

export interface Student {
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
}
