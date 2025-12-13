import './TournamentDiscipline.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getPoomsaeCombinationsByTournament } from '@/api/tournament/PoomsaeCombinationAPI';

import type { CombinationDetail } from '@/types/tournament/PoomsaeCombinationType';

import TournamentCombination from './TournamentCombination/TournamentCombination';
import TournamentDetailsSidebar from '../TournamentDetails/TournamentDetailsSidebar/TournamentDetailsSidebar';

// /giai-dau/:tournamentId/:discipline
export default function TournamentDiscipline() {
    const { tournamentId, discipline } = useParams<{
        tournamentId: string;
        discipline: string;
    }>();

    const [combinations, setCombinations] = useState<CombinationDetail[]>([]);

    useEffect(() => {
        if (tournamentId) {
            getPoomsaeCombinationsByTournament(tournamentId).then(setCombinations);
        }
    }, [tournamentId]);

    if (discipline !== 'quyen' && discipline !== 'doi-khang') {
        return <div>Invalid tournament type</div>;
    }

    if (!tournamentId) {
        return <div>Loading...</div>;
    }

    return (
        <div className="tournament-poomsae--container">
            <TournamentCombination
                combinations={combinations}
                tournamentId={tournamentId!}
                discipline={discipline!}
            />
            <TournamentDetailsSidebar tournamentId={tournamentId!} />
        </div>
    );
}