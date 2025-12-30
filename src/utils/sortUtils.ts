import type { Bxh } from '../types/bxh';

type SortOption = 'rank' | 'count' | 'time' | 'level' | 'name';
type SortDirection = 'asc' | 'desc';

export function sortPlayersByRank(
    players: Bxh[],
    sortBy: SortOption = 'rank',
    direction: SortDirection = 'asc'
): Bxh[] {
    return [...players].sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
            case 'count':
                comparison = a.amount - b.amount;
                break;

            case 'time':
                comparison = a.duration - b.duration;
                break;

            case 'level':
                comparison = a.level - b.level;
                break;

            case 'name':
                comparison = a.studentName.localeCompare(b.studentName, 'vi', {
                    sensitivity: 'base',
                    ignorePunctuation: true
                });
                break;

            default:
                comparison = a.date.getTime() - b.date.getTime();
        }

        return direction === 'desc' ? -comparison : comparison;
    });
}

// export function getPlayerRank(targetPlayer: Bxh): number {
//     return targetPlayer.rank;
// }

export function getTopPlayers(players: Bxh[], count: number = 3): Bxh[] {
    return sortPlayersByRank(players, 'rank', 'asc').slice(0, count);
}

export function getPlayerStats(players: Bxh[]) {
    if (players.length === 0) {
        return {
            total: 0,
            avgCount: 0,
            avgTime: 0,
            avgLevel: 0,
            maxCount: 0,
            maxTime: 0,
            maxLevel: 0
        };
    }

    const totalAmount = players.reduce((sum, player) => sum + player.amount, 0);
    const totalDuration = players.reduce((sum, player) => sum + player.duration, 0);
    const totalLevel = players.reduce((sum, player) => sum + player.level, 0);

    return {
        total: players.length,
        avgAmount: Math.round(totalAmount / players.length),
        avgDuration: Math.round(totalDuration / players.length),
        avgLevel: Number((totalLevel / players.length).toFixed(2)),
        maxAmount: Math.max(...players
            .filter(p => p.accept)
            .map(p => p.amount)),
        maxDuration: Math.max(...players
            .filter(p => p.accept)
            .map(p => p.duration)),
        maxLevel: Math.max(...players.map(p => p.level))
    };
}