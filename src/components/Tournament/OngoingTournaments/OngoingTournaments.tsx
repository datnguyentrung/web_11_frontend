import './OngoingTournaments.scss';
import { Trophy, Calendar, MapPin } from 'lucide-react';
import { formatDateDMY } from '@/utils/format';
import { TournamentScopeLabel } from '@/enums/Tournament';
import type { Tournament as TournamentType } from '@/types/tournament/TournamentType';
import { useNavigate } from "react-router-dom";

export default function OngoingTournaments({ tournaments }: { tournaments: TournamentType[] }) {
    const navigate = useNavigate();

    const handleTournamentClick = (idTournament: string) => {
        navigate(`/giai-dau/${idTournament}`);
    }

    return (
        <div className="ongoing-tournaments">
            <h2 className="ongoing-tournaments__title">
                <Trophy className="ongoing-tournaments__icon" />
                Đang Diễn Ra
            </h2>

            {tournaments.length === 0 ? (
                <div className="ongoing-tournaments__empty">
                    Hiện không có giải đấu nào đang diễn ra
                </div>
            ) : (
                <div className="ongoing-tournaments__list">
                    {tournaments.map((tournament) => (
                        <div
                            key={tournament.idTournament}
                            className="ongoing-tournaments__card"
                        >
                            <div className="ongoing-tournaments__content">
                                <div className="ongoing-tournaments__main">
                                    <div className="ongoing-tournaments__badges">
                                        <span className="ongoing-tournaments__live-badge">
                                            LIVE
                                        </span>
                                        <span className="ongoing-tournaments__scope-badge">
                                            {TournamentScopeLabel[tournament.tournamentScope]}
                                        </span>
                                    </div>
                                    <h3 className="ongoing-tournaments__name" onClick={() => handleTournamentClick(tournament.idTournament)}>
                                        {tournament.tournamentName}
                                    </h3>
                                    <div className="ongoing-tournaments__info">
                                        <div className="ongoing-tournaments__date">
                                            <Calendar className="ongoing-tournaments__info-icon" />
                                            <span>{formatDateDMY(tournament.tournamentDate)}</span>
                                        </div>
                                        {tournament.location && (
                                            <div className="ongoing-tournaments__location">
                                                <MapPin className="ongoing-tournaments__info-icon" />
                                                <span>{tournament.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="ongoing-tournaments__indicator">
                                    <div className="ongoing-tournaments__pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}