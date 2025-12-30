import type { Node } from "@/types/tournament/SigmaType";

export const getTotalPlayersNeeded = (playerCount: number) => {
    return Math.ceil(Math.log2(playerCount));
}

export const getTournamentStructure = (nodeList: Node[]) => {
    const uniqueLevels = [...new Set(nodeList.map(node => node.levelNode))];
    return uniqueLevels.map(level => {
        // Lấy các node cùng level
        const nodesAtLevel = nodeList.filter(n => n.levelNode === level);

        // Gom theo parentNodeId để xác định số trận đấu
        const parents = nodesAtLevel.reduce<Record<number, number[]>>((acc, node) => {
            if (!acc[node.parentNodeId]) {
                acc[node.parentNodeId] = [];
            }
            acc[node.parentNodeId].push(node.childNodeId);
            return acc;
        }, {});

        return {
            level,
            parents,
        };
    });
};


export const getLabelForMatch = ({ roundIndex, totalRounds }: { roundIndex: number, totalRounds: number }) => {
    switch (roundIndex) {
        case totalRounds + 1:
            return "Tranh hạng 3";
        case totalRounds:
            return "🏆"
        case totalRounds - 1:
            return null; // Chung kết không cần label
        case totalRounds - 2:
            return "Bán kết";
        case totalRounds - 3:
            return "Tứ kết";
        case totalRounds - 4:
            return "Vòng loại";
        default:
            return `Vòng ${roundIndex + 1}`;
    }
}