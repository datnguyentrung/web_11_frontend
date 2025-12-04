import './TournamentDiscipline.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getPoomsaeCombinationsByTournament } from '@/api/tournament/PoomsaeCombinationAPI';

import type { CombinationDetail } from '@/types/tournament/PoomsaeCombinationType';

import TournamentCombination from './TournamentCombination/TournamentCombination';
import TournamentDetailsSidebar from '../TournamentDetails/TournamentDetailsSidebar/TournamentDetailsSidebar';

// /giai-dau/:idTournament/quyen
export default function TournamentDiscipline() {
    const { idTournament } = useParams<{ idTournament: string }>();
    const { tournamentType } = useParams<{ tournamentType: string }>();

    const [combinations, setCombinations] = useState<CombinationDetail[]>([]);

    useEffect(() => {
        if (idTournament) {
            getPoomsaeCombinationsByTournament(idTournament).then(setCombinations);
        }
    }, [idTournament]);

    if (tournamentType !== 'quyen' && tournamentType !== 'doi-khang') {
        return <div>Invalid tournament type</div>;
    }

    if (!idTournament) {
        return <div>Loading...</div>;
    }

    return (
        <div className="tournament-poomsae--container">
            <TournamentCombination
                combinations={combinations}
                idTournament={idTournament!}
                tournamentType={tournamentType!}
            />
            <TournamentDetailsSidebar idTournament={idTournament!} />
        </div>
    );
}