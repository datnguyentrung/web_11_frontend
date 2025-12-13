// import { endpoints } from '@/api/endpoints';
// import axiosInstance from '@/api/axiosInstance';

export const getBracketNodesByParticipants = async (participants: number) => {
    try {
        // const response = await axiosInstance.get(endpoints.bracketNodes.byParticipants(participants));
        // return response.data.data;
        return [
            {
                "parentNodeId": 15,
                "childNodeId": 17,
                "levelNode": 4,
                "bracketNodes": [
                    8
                ],
                "participants": 12
            },
            {
                "parentNodeId": 20,
                "childNodeId": 22,
                "levelNode": 4,
                "bracketNodes": [
                    11
                ],
                "participants": 12
            },
            {
                "parentNodeId": 18,
                "childNodeId": 19,
                "levelNode": 3,
                "bracketNodes": [
                    9
                ],
                "participants": 12
            },
            {
                "parentNodeId": 1,
                "childNodeId": 2,
                "levelNode": 2,
                "bracketNodes": [
                    0,
                    1,
                    2
                ],
                "participants": 12
            },
            {
                "parentNodeId": 2,
                "childNodeId": 4,
                "levelNode": 3,
                "bracketNodes": [
                    1,
                    2
                ],
                "participants": 12
            },
            {
                "parentNodeId": 15,
                "childNodeId": 16,
                "levelNode": 4,
                "bracketNodes": [
                    7
                ],
                "participants": 12
            },
            {
                "parentNodeId": 7,
                "childNodeId": 8,
                "levelNode": 3,
                "bracketNodes": [
                    3
                ],
                "participants": 12
            },
            {
                "parentNodeId": 1,
                "childNodeId": 7,
                "levelNode": 2,
                "bracketNodes": [
                    3,
                    4,
                    5
                ],
                "participants": 12
            },
            {
                "parentNodeId": 9,
                "childNodeId": 11,
                "levelNode": 4,
                "bracketNodes": [
                    5
                ],
                "participants": 12
            },
            {
                "parentNodeId": 12,
                "childNodeId": 13,
                "levelNode": 2,
                "bracketNodes": [
                    6,
                    7,
                    8
                ],
                "participants": 12
            },
            {
                "parentNodeId": 13,
                "childNodeId": 14,
                "levelNode": 3,
                "bracketNodes": [
                    6
                ],
                "participants": 12
            },
            {
                "parentNodeId": 20,
                "childNodeId": 21,
                "levelNode": 4,
                "bracketNodes": [
                    10
                ],
                "participants": 12
            },
            {
                "parentNodeId": 0,
                "childNodeId": 12,
                "levelNode": 1,
                "bracketNodes": [
                    6,
                    7,
                    8,
                    9,
                    10,
                    11
                ],
                "participants": 12
            },
            {
                "parentNodeId": null,
                "childNodeId": 0,
                "levelNode": 0,
                "bracketNodes": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11
                ],
                "participants": 12
            },
            {
                "parentNodeId": 13,
                "childNodeId": 15,
                "levelNode": 3,
                "bracketNodes": [
                    7,
                    8
                ],
                "participants": 12
            },
            {
                "parentNodeId": 9,
                "childNodeId": 10,
                "levelNode": 4,
                "bracketNodes": [
                    4
                ],
                "participants": 12
            },
            {
                "parentNodeId": 4,
                "childNodeId": 5,
                "levelNode": 4,
                "bracketNodes": [
                    1
                ],
                "participants": 12
            },
            {
                "parentNodeId": 18,
                "childNodeId": 20,
                "levelNode": 3,
                "bracketNodes": [
                    10,
                    11
                ],
                "participants": 12
            },
            {
                "parentNodeId": 12,
                "childNodeId": 18,
                "levelNode": 2,
                "bracketNodes": [
                    9,
                    10,
                    11
                ],
                "participants": 12
            },
            {
                "parentNodeId": 4,
                "childNodeId": 6,
                "levelNode": 4,
                "bracketNodes": [
                    2
                ],
                "participants": 12
            },
            {
                "parentNodeId": 2,
                "childNodeId": 3,
                "levelNode": 3,
                "bracketNodes": [
                    0
                ],
                "participants": 12
            },
            {
                "parentNodeId": 7,
                "childNodeId": 9,
                "levelNode": 3,
                "bracketNodes": [
                    4,
                    5
                ],
                "participants": 12
            },
            {
                "parentNodeId": 0,
                "childNodeId": 1,
                "levelNode": 1,
                "bracketNodes": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5
                ],
                "participants": 12
            }
        ];
    } catch (error) {
        console.error(`Error fetching bracket nodes for participants ${participants}:`, error);
        throw error;
    }
}