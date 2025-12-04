import './UpcomingTournaments.scss';
import { Clock, Calendar, MapPin } from 'lucide-react';
import { formatDateDMY } from '@/utils/format';
import { TournamentScopeLabel } from '@/enums/Tournament';
import type { Tournament as TournamentType } from '@/types/tournament/TournamentType';

function getDaysUntil(date: Date): number {
    const now = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
}

export default function UpcomingTournaments({ tournaments }: { tournaments: TournamentType[] }) {
    return (
        <div className="upcoming-tournaments">
            <h2 className="upcoming-tournaments__title">
                <Clock className="upcoming-tournaments__icon" />
                Sắp Diễn Ra
            </h2>

            {tournaments.length === 0 ? (
                <div className="upcoming-tournaments__empty">
                    Chưa có giải đấu sắp tới
                </div>
            ) : (
                <div className="upcoming-tournaments__list">
                    {tournaments.map((tournament) => {
                        const daysUntil = getDaysUntil(tournament.tournamentDate);
                        return (
                            <div
                                key={tournament.idTournament}
                                className="upcoming-tournaments__card"
                            >
                                <div className="upcoming-tournaments__content">
                                    <div className="upcoming-tournaments__header">
                                        <span className="upcoming-tournaments__scope-badge">
                                            {TournamentScopeLabel[tournament.tournamentScope]}
                                        </span>
                                        <div className="upcoming-tournaments__countdown">
                                            Còn {daysUntil} ngày
                                        </div>
                                    </div>

                                    <h3 className="upcoming-tournaments__name">
                                        {tournament.tournamentName}
                                    </h3>

                                    <div className="upcoming-tournaments__info">
                                        <div className="upcoming-tournaments__date">
                                            <Calendar className="upcoming-tournaments__info-icon upcoming-tournaments__info-icon--blue" />
                                            <span>{formatDateDMY(tournament.tournamentDate)}</span>
                                        </div>
                                        {tournament.location && (
                                            <div className="upcoming-tournaments__location">
                                                <MapPin className="upcoming-tournaments__info-icon upcoming-tournaments__info-icon--blue" />
                                                <span>{tournament.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    <button className="upcoming-tournaments__button">
                                        Xem Chi Tiết
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}