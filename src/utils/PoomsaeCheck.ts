import type { PoomsaeHistory } from '@/types/tournament/PoomsaeType';

export function isPoomsaeHistory(obj: unknown): obj is PoomsaeHistory {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'idPoomsaeHistory' in obj &&
        'nodeInfo' in obj &&
        'referenceInfo' in obj
    );
}