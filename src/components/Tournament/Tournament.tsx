import './Tournament.scss';
import { useState, useEffect } from 'react';
import OngoingTournaments from './OngoingTournaments/OngoingTournaments';
import UpcomingTournaments from './UpcomingTournaments/UpcomingTournaments';
import CompletedTournaments from './CompletedTournaments/CompletedTournaments';

import type { Tournament as TournamentType } from '@/types/tournament/TournamentType';

import { getAllTournaments } from '@/api/tournament/TournamentAPI';
import { TournamentState } from '@/enums/Tournament';

export default function Tournament() {
    const [tournaments, setTournaments] = useState<TournamentType[]>([]);

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const data = await getAllTournaments();
                setTournaments(data);
            } catch (error) {
                console.error("Failed to fetch tournaments:", error);
            }
        };

        fetchTournaments();
    }, []);

    return (
        <main className="tournament-main">
            <div className="tournament">
                <div className="tournament__grid">
                    <div className="tournament__left">
                        <div className="tournament__current">
                            <OngoingTournaments
                                tournaments={tournaments.filter(t => t.tournamentState === TournamentState.ONGOING)}
                            />
                            <CompletedTournaments
                                tournaments={tournaments.filter(t => t.tournamentState === TournamentState.COMPLETED)}
                            />
                        </div>
                    </div>
                    <div className="tournament__right">
                        <div className="tournament__sticky">
                            <UpcomingTournaments
                                tournaments={tournaments.filter(t => t.tournamentState === TournamentState.UPCOMING)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}