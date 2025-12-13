import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import type { HistoryInfo } from '@/types/tournament/TournamentType';

import SigmaElimination from './SigmaElimination/SigmaElimination';

import { filterPoomsaeHistories } from '@/api/tournament/Poomsae/PoomsaeHistoryAPI';

export default function Sigma() {
    const { tournamentId, discipline, combinationId } = useParams<{
        tournamentId: string;
        discipline: string;
        combinationId: string;
    }>();
    const [searchParams] = useSearchParams();
    const sigmaType = searchParams.get('sigma_type'); // 'ELIMINATION' or 'ROUND_ROBIN'
    const combinationName = searchParams.get('combination_name') || ''; // Lấy từ URL

    const [players, setPlayers] = React.useState<HistoryInfo[]>([]);
    const [isDataFetched, setIsDataFetched] = React.useState(false);


    const fetchData = React.useCallback(async () => {
        if (tournamentId && combinationId) {
            try {
                // Fetch histories
                const histories = await filterPoomsaeHistories(tournamentId, combinationId, null);
                setPlayers(histories);

                setIsDataFetched(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }, [tournamentId, combinationId]);

    const handleRefresh = React.useCallback(async () => {
        console.log('Refreshing data...');
        await fetchData();
    }, [fetchData]);

    React.useEffect(() => {
        if (isDataFetched) return;
        fetchData();
    }, [isDataFetched, fetchData]);

    if (!tournamentId || !combinationId || !discipline) {
        return <div>Invalid parameters</div>;
    }

    return (
        <>
            <SigmaElimination
                players={players}
                participants={players.length}
                content={combinationName}
                onRefresh={handleRefresh}
            />
        </>
    );
}