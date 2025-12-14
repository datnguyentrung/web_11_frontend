import { endpoints } from '@/api/endpoints';
import axiosInstance from '@/api/axiosInstance';
import type { CheckModeResponse } from '@/types/tournament/PoomsaeCombinationType';

export const createPoomsaeHistoryForElimination = async (competitorList: string[]) => {
    try {
        console.log('Creating poomsae history for elimination with competitors:', competitorList);
        const response = await axiosInstance.post(endpoints.poomsaeHistory.createForElimination,
            competitorList
        );
        return response.data.data;
    } catch (error) {
        console.error('Error creating poomsae history for elimination:', error);
        throw error;
    }
}

export const checkModePoomsaeHistoryExistence = async (
    idTournament: string,
    idCombination: string,
    idAccount?: string
): Promise<CheckModeResponse> => {
    try {
        // const response = await axiosInstance.get(endpoints.poomsaeHistory.checkExistence, {
        //     params: {
        //         idTournament,
        //         idCombination,
        //         idAccount
        //     }
        // });
        // return response.data.data;
        return {
            "exists": true,
            "poomsaeMode": "ELIMINATION"
        };
    } catch (error) {
        console.error('Error checking existence of poomsae history by filter:', error);
        throw error;
    }
}

export const createPoomsaeEliminationWinner = async (winnerId: string, participants: number) => {
    try {
        const response = await axiosInstance.post(endpoints.poomsaeHistory.createWinnerForElimination, {
            params: {
                participants,
                idHistory: winnerId
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error creating poomsae elimination winner:', error);
        throw error;
    }
}

export const deletePoomsaeHistoryForElimination = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`${endpoints.poomsaeHistory.createForElimination}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting poomsae history for elimination:', error);
        throw error;
    }
}

export const filterPoomsaeHistories = async (idTournament: string, idCombination: string, idAccount: string | null) => {
    try {
        // const response = await axiosInstance.get(endpoints.poomsaeHistory.filter, {
        //     params: {
        //         idTournament,
        //         idCombination,
        //         idAccount
        //     }
        // });
        // return response.data.data;
        return [
            {
                "sourceNode": 3,
                "targetNode": 2,
                "levelNode": 3,
                "idHistory": "66d54e56-e541-4e2e-bc97-4070b54f1a7e",
                "hasWon": null,
                "student": {
                    "name": "Vũ Ngọc Ánh",
                    "idAccount": null,
                    "idNational": "HV_anhvn_290710",
                    "birthDate": "2012-05-01",
                    "isActive": true
                }
            },
            {
                "sourceNode": 5,
                "targetNode": 4,
                "levelNode": 4,
                "idHistory": "ee2a9ad6-ea16-41a3-85b8-941f4681822d",
                "hasWon": null,
                "student": {
                    "name": "Vương Anh Quân",
                    "idAccount": null,
                    "idNational": "HV_quanva_271214",
                    "birthDate": "2016-03-01",
                    "isActive": true
                }
            },
            {
                "sourceNode": 6,
                "targetNode": 4,
                "levelNode": 4,
                "idHistory": "f6104d83-ec06-4536-a2ce-d2f55a9dd4ea",
                "hasWon": null,
                "student": {
                    "name": "Đồng Xuân Phương",
                    "idAccount": null,
                    "idNational": "HV_phuongdx_201111",
                    "birthDate": "2012-08-01",
                    "isActive": true
                }
            },
            {
                "sourceNode": 8,
                "targetNode": 7,
                "levelNode": 3,
                "idHistory": "69f5290d-81c4-48c9-9478-df946a11fe83",
                "hasWon": null,
                "student": {
                    "name": "Trần Vân Anh",
                    "idAccount": null,
                    "idNational": "HV_anhtv_111108",
                    "birthDate": "2008-11-01",
                    "isActive": true
                }
            },
            {
                "sourceNode": 10,
                "targetNode": 9,
                "levelNode": 4,
                "idHistory": "afc593d7-3a99-4dc4-9464-7f428a221c25",
                "hasWon": null,
                "student": {
                    "name": "Nguyễn Minh Quang",
                    "idAccount": null,
                    "idNational": "HV_quangnm_010911",
                    "birthDate": "2011-01-01",
                    "isActive": true
                }
            },
            {
                "sourceNode": 11,
                "targetNode": 9,
                "levelNode": 4,
                "idHistory": "1157c07d-b9ca-465a-b294-0d51a593fc3b",
                "hasWon": null,
                "student": {
                    "name": "Bùi Bảo Nam",
                    "idAccount": null,
                    "idNational": "HV_nambb_181008",
                    "birthDate": "2009-06-01",
                    "isActive": true
                }
            },
            {
                "sourceNode": 14,
                "targetNode": 13,
                "levelNode": 3,
                "idHistory": "9f6c17a6-efa2-4efa-9773-aa41a342f170",
                "hasWon": null,
                "student": {
                    "name": "Vũ Hoàng Phúc",
                    "idAccount": null,
                    "idNational": "HV_phucvh_111209",
                    "birthDate": "2009-11-01",
                    "isActive": true
                }
            },
            {
                "sourceNode": 16,
                "targetNode": 15,
                "levelNode": 4,
                "idHistory": "be3a0c88-810a-4dc8-ab76-138b07dcce7d",
                "hasWon": null,
                "student": {
                    "name": "Vũ Hoàng Đức",
                    "idAccount": null,
                    "idNational": "HV_ducvh_050906",
                    "birthDate": "2006-05-01",
                    "isActive": true
                }
            },
            {
                "sourceNode": 17,
                "targetNode": 15,
                "levelNode": 4,
                "idHistory": "d052a5dd-d1d5-4d44-bff3-83c312bd98cd",
                "hasWon": null,
                "student": {
                    "name": "Nguyễn Hà Vy",
                    "idAccount": null,
                    "idNational": "HV_vynh_171211",
                    "birthDate": "2012-05-01",
                    "isActive": true
                }
            },
            {
                "sourceNode": 19,
                "targetNode": 18,
                "levelNode": 3,
                "idHistory": "b7bd9aa1-ac1d-42bf-91ed-7b5b08a0566b",
                "hasWon": null,
                "student": {
                    "name": "Trần Phúc Anh",
                    "idAccount": null,
                    "idNational": "HV_anhtp_110814",
                    "birthDate": "2014-11-01",
                    "isActive": true
                }
            },
            {
                "sourceNode": 21,
                "targetNode": 20,
                "levelNode": 4,
                "idHistory": "e24e0e84-d9b5-45e9-9680-d0f2f21e7e54",
                "hasWon": null,
                "student": {
                    "name": "Ngô Tuấn Minh",
                    "idAccount": null,
                    "idNational": "HV_minhnt_110214",
                    "birthDate": "2014-11-01",
                    "isActive": true
                }
            },
            {
                "sourceNode": 22,
                "targetNode": 20,
                "levelNode": 4,
                "idHistory": "f148f95a-6d48-4ec0-a511-bb16f543b82b",
                "hasWon": null,
                "student": {
                    "name": "Ngô Khải Nguyên",
                    "idAccount": null,
                    "idNational": "HV_nguyennk_290709",
                    "birthDate": "2011-05-01",
                    "isActive": true
                }
            }
        ];
    } catch (error) {
        console.error('Error filtering poomsae histories:', error);
        throw error;
    }
}