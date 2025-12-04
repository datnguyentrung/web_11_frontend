import './CompetitorListCard.scss';
import { useEffect, useState } from 'react';
import { Plus, Trophy } from 'lucide-react';
import { getPoomsaeListByFilter } from '@/api/achievement/PoomsaeListAPI';
import { getSparringListByFilter } from '@/api/achievement/SparringListAPI';
import { createPoomsaeHistoryForElimination } from '@/api/tournament/PoomsaeHistoryAPI';
import { existPoomsaeHistoryByFilter } from '@/api/tournament/PoomsaeHistoryAPI';

import type { CompetitorBaseDTO } from '@/types/achievement/Competitor';

type Props = {
    tournamentId: string,
    combinationId: string,
    combinationName: string,
    tournamentType: string
}

export default function CompetitorListCard({ tournamentId, combinationId, combinationName, tournamentType }: Props) {
    const [loading, setLoading] = useState(false);
    const [competitors, setCompetitors] = useState<CompetitorBaseDTO[]>([]);
    const [existsSigma, setExistsSigma] = useState<boolean>(false);



    useEffect(() => {
        if (!tournamentId || !combinationId) {
            return;
        }

        // Gọi API để lấy danh sách vận động viên dựa trên tournamentId và combinationId
        const fetchPoomsaeCompetitors = async () => {
            setLoading(true);
            try {
                const [data, exists] = await Promise.all([
                    getPoomsaeListByFilter(tournamentId, combinationId, null, null),
                    existPoomsaeHistoryByFilter(tournamentId, combinationId, null)
                ]);
                setExistsSigma(exists);
                // console.log('Poomsae data received:', data); // Debug log
                setCompetitors(data);
            } catch (error) {
                console.error("Error fetching poomsae competitors:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchSparringCompetitors = async () => {
            setLoading(true);
            try {
                const [data, exists] = await Promise.all([
                    getSparringListByFilter(tournamentId, combinationId, null, null),
                    existPoomsaeHistoryByFilter(tournamentId, combinationId, null)
                ]);
                setExistsSigma(exists);
                // console.log('Sparring data received:', data); // Debug log
                setCompetitors(data);
            } catch (error) {
                console.error("Error fetching sparring competitors:", error);
            } finally {
                setLoading(false);
            }
        };

        if (tournamentType === 'quyen') {
            fetchPoomsaeCompetitors();
        } else if (tournamentType === 'doi-khang') {
            fetchSparringCompetitors();
        }
    }, [tournamentId, combinationId, tournamentType]);

    const handleAddCompetitor = () => {
        // TODO: Implement add competitor functionality
        console.log('Add competitor clicked');
    };

    const handleCreateBracket = () => {
        if (tournamentType === 'quyen' && competitors.length > 0) {
            // Gọi API để tạo bảng đấu quyền
            createPoomsaeHistoryForElimination(competitors.map(c => c.idCompetitor!))
                .then(() => {
                    console.log('Bảng đấu quyền đã được tạo thành công');
                })
                .catch((error) => {
                    console.error('Lỗi khi tạo bảng đấu quyền:', error);
                });
        } else if (tournamentType === 'doi-khang') {
            // Gọi API để tạo bảng đấu đối kháng
        }
    };

    const handleViewBracket = () => {
        console.log('View bracket clicked');
    }

    // Kiểm tra xem tournamentType có hợp lệ không
    if (tournamentType !== 'quyen' && tournamentType !== 'doi-khang') {
        return <div>Loại giải đấu không hợp lệ</div>;
    }

    if (loading) {
        return <div>Đang tải danh sách vận động viên...</div>;
    }

    return (
        <div className="competitor-list">
            <div className="competitor-list__header">
                <div className="competitor-list__title-section">
                    <h2>Danh Sách Vận Động Viên</h2>
                    <p>Loại giải: {tournamentType === 'quyen' ? 'Quyền' : 'Đối Kháng'} - {combinationName}</p>
                </div>
                <div className="competitor-list__actions">
                    <button
                        className="competitor-list__action competitor-list__action--secondary"
                        onClick={handleAddCompetitor}
                    >
                        <Plus className="competitor-list__action-icon" />
                        Thêm vận động viên
                    </button>
                    {competitors.length === 0 ? (
                        <div className="competitor-list__info-message">
                            Chưa có vận động viên nào để tạo bảng đấu
                        </div>
                    ) : (!existsSigma && competitors.length > 0 ? (
                        <button
                            className="competitor-list__action competitor-list__action--primary"
                            onClick={handleCreateBracket}
                        >
                            <Trophy className="competitor-list__action-icon" />
                            Tạo bảng đấu
                        </button>
                    ) : (
                        existsSigma &&
                        <button
                            className="competitor-list__action competitor-list__action--primary"
                            onClick={handleViewBracket}
                        >
                            <Trophy className="competitor-list__action-icon" />
                            Xem bảng đấu
                        </button>
                    ))}

                </div>
            </div>
            {competitors.length === 0 ? (
                <div>Không có vận động viên nào</div>
            ) : (
                <div className="competitor-list__grid">
                    {competitors.map((competitor) => {
                        const detail = competitor.competitorDetailDTO;
                        const student = detail.personalAcademicInfo;
                        return (
                            <div key={competitor.idCompetitor || Math.random()} className="competitor-card">
                                <div className="competitor-card__info">
                                    <h3>
                                        {student?.personalInfo?.name ||
                                            'Tên không có sẵn'}
                                    </h3>
                                    <p>ID: {student?.personalInfo?.idAccount || 'N/A'}</p>
                                    <p>Chi nhánh: {student?.academicInfo?.idBranch || 'N/A'}</p>
                                    <p>Đai: {student?.academicInfo?.beltLevel || 'N/A'}</p>
                                    {detail.medal && (
                                        <p className="medal">Huy chương: {detail.medal}</p>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}