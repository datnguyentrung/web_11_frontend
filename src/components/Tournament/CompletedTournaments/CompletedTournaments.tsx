import './CompletedTournaments.scss';
import { CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { formatDateDMY } from '@/utils/format';
import { TournamentScopeLabel } from '@/enums/Tournament';
import type { Tournament as TournamentType } from '@/types/tournament/TournamentType';

export default function CompletedTournaments({ tournaments }: { tournaments: TournamentType[] }) {
    return (
        <div className="completed-tournaments">
            <h2 className="completed-tournaments__title">
                <CheckCircle2 className="completed-tournaments__icon" />
                Đã Hoàn Thành
            </h2>

            {tournaments.length === 0 ? (
                <div className="completed-tournaments__empty">
                    Chưa có giải đấu nào hoàn thành
                </div>
            ) : (
                <div className="completed-tournaments__table-container">
                    <table className="completed-tournaments__table">
                        <thead className="completed-tournaments__header">
                            <tr>
                                <th className="completed-tournaments__th">Tên Giải Đấu</th>
                                <th className="completed-tournaments__th">Cấp Độ</th>
                                <th className="completed-tournaments__th">Ngày</th>
                                <th className="completed-tournaments__th">Địa Điểm</th>
                            </tr>
                        </thead>
                        <tbody className="completed-tournaments__body">
                            {tournaments.map((tournament) => (
                                <tr
                                    key={tournament.idTournament}
                                    className="completed-tournaments__row"
                                >
                                    <td className="completed-tournaments__td">
                                        <div className="completed-tournaments__name-cell">
                                            <CheckCircle2 className="completed-tournaments__check-icon" />
                                            <span className="completed-tournaments__name">{tournament.tournamentName}</span>
                                        </div>
                                    </td>
                                    <td className="completed-tournaments__td">
                                        <span className="completed-tournaments__scope-badge">
                                            {TournamentScopeLabel[tournament.tournamentScope]}
                                        </span>
                                    </td>
                                    <td className="completed-tournaments__td completed-tournaments__date-cell">
                                        <div className="completed-tournaments__date">
                                            <Calendar className="completed-tournaments__date-icon" />
                                            {formatDateDMY(tournament.tournamentDate)}
                                        </div>
                                    </td>
                                    <td className="completed-tournaments__td completed-tournaments__location-cell">
                                        {tournament.location && (
                                            <div className="completed-tournaments__location">
                                                <MapPin className="completed-tournaments__location-icon" />
                                                {tournament.location}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}