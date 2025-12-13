import './TournamentCombination.scss';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Trophy, Users, Calendar, Award } from 'lucide-react';
import type { CombinationDetail } from '@/types/tournament/PoomsaeCombinationType';
import { BeltLevelLabel } from '@/enums/Student';
import { PoomsaeModeLabel } from '@/enums/Tournament';

type Props = {
    combinations: CombinationDetail[];
    tournamentId: string;
    discipline: string; // "quyen" or "doi-khang"
};

export default function TournamentCombination({ combinations, tournamentId, discipline }: Props) {
    const navigate = useNavigate();

    const handleCombinationClick = (
        page: 'danh-sach' | 'bang-dau',
        combinationId: string,
        combinationName: string,
        sigmaType?: string
    ) => {
        const path = `/giai-dau/${tournamentId}/${discipline}/${combinationId}/${page}`;

        const params: Record<string, string> = {
            combination_name: combinationName
        };

        // Nếu có sigmaType (khi vào bảng đấu), thêm vào search params
        if (sigmaType) {
            params.sigma_type = sigmaType;
        }

        navigate({
            pathname: path,
            search: createSearchParams(params).toString()
        });
    };

    return (
        <div className="tournament-combinations">
            <div className="tournament-combinations__header">
                <h2 className="tournament-combinations__title">
                    <Trophy className="tournament-combinations__icon" />
                    Hạng Đấu Quyền
                </h2>
                <p className="tournament-combinations__subtitle">
                    Chọn hạng đấu để xem thông tin chi tiết
                </p>
            </div>

            {combinations.length === 0 ? (
                <div className="tournament-combinations__empty">
                    <Award className="tournament-combinations__empty-icon" />
                    <p>Chưa có hạng đấu quyền nào được thiết lập</p>
                </div>
            ) : (
                <div className="tournament-combinations__grid">
                    {combinations.map((combination) => (
                        <div key={combination.idPoomsaeCombination} className="combination-card">
                            <div className="combination-card__header">
                                <h3 className="combination-card__title">
                                    {combination.poomsaeContentName}
                                </h3>
                                <span className="combination-card__mode">
                                    {PoomsaeModeLabel[combination.poomsaeMode]}
                                </span>
                            </div>

                            <div className="combination-card__info">
                                <div className="combination-card__detail">
                                    <Users className="combination-card__detail-icon" />
                                    <span>Tuổi: {combination.ageGroupDTO.minAge} - {combination.ageGroupDTO.maxAge}</span>
                                </div>
                                <div className="combination-card__detail">
                                    <Award className="combination-card__detail-icon" />
                                    <span>
                                        Đai: {BeltLevelLabel[combination.beltGroupDTO.startBelt]} đến {BeltLevelLabel[combination.beltGroupDTO.endBelt]}
                                    </span>
                                </div>
                            </div>

                            <div className="combination-card__actions">
                                <button
                                    className="combination-card__action combination-card__action--primary"
                                    onClick={() => handleCombinationClick('bang-dau', combination.idPoomsaeCombination, combination.poomsaeContentName, combination.poomsaeMode)}
                                >
                                    <Calendar className="combination-card__action-icon" />
                                    Bảng Đấu
                                </button>
                                <button
                                    className="combination-card__action combination-card__action--secondary"
                                    onClick={() => handleCombinationClick('danh-sach', combination.idPoomsaeCombination, combination.poomsaeContentName)}
                                >
                                    <Users className="combination-card__action-icon" />
                                    Danh Sách
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}