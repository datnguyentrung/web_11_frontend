import React from 'react';
import type { PoomsaeHistory } from '@/types/tournament/PoomsaeType';
import RoundRobinGroup from './RoundRobinGroup';
import './RoundRobinManager.scss';
import type { TournamentMatchDTO } from '@/types/tournament/TournamentMatchType';
import { createTournamentMatch } from '@/services/tournament/TournamentMatch';
import type { ContextMenuItem } from '@/utils/ContextMenu';
import { UserPlus } from 'lucide-react';
import { toast } from 'react-toastify';
import ContextMenu from '@/utils/ContextMenu';

type Props = {
    players?: PoomsaeHistory[];
    participants?: number;
    content?: string;
    onRefresh?: () => Promise<void>;
    combinationId?: string | null;
}

export default function RoundRobinManager({ players, onRefresh, combinationId }: Props) {
    const [tournamentState, setTournamentState] = React.useState({
        qualifyingGroups: [] as (PoomsaeHistory)[],
        finalsPlayers: [] as (PoomsaeHistory)[],
        medalistPlayers: [] as (PoomsaeHistory)[]
    });

    // Initialize tournament groups from players data
    React.useEffect(() => {
        const qualifyingPlayers = players?.filter(p => p.nodeInfo.levelNode === 2) || [];
        const finalPlayers = players?.filter(p => p.nodeInfo.levelNode === 1) || [];
        const medalPlayers = players?.filter(p => p.nodeInfo.levelNode === 0) || [];

        setTournamentState({
            qualifyingGroups: qualifyingPlayers,
            finalsPlayers: finalPlayers.sort((a, b) => a.nodeInfo.sourceNode - b.nodeInfo.sourceNode),
            medalistPlayers: medalPlayers.sort((a, b) => a.nodeInfo.sourceNode - b.nodeInfo.sourceNode)
        });
    }, [players]);

    const getTournamentPhase = () => {
        if (tournamentState.medalistPlayers.length === 3) return 'completed';
        if (tournamentState.finalsPlayers.length > 0) return 'finals';
        if (tournamentState.qualifyingGroups.length > 0) return 'qualifying';
        return 'not-started';
    };

    const currentPhase = getTournamentPhase();

    // Create placeholder players for empty slots
    const createPlaceholderPlayer = (id: number, level: number): PoomsaeHistory => ({
        idPoomsaeHistory: `placeholder-${level}-${id}`,
        nodeInfo: {
            levelNode: level,
            sourceNode: id,
            targetNode: level > 0 ? Math.ceil(id / 2) : 0
        },
        referenceInfo: {
            name: '',
            id: `placeholder-${level}-${id}`
        }
    } as PoomsaeHistory);

    // Ensure finals always has 8 slots
    const finalsPlayersWithPlaceholders = [...tournamentState.finalsPlayers];
    const mapFinals = tournamentState.finalsPlayers.map(player => player.nodeInfo.sourceNode);
    for (let i = 0; i < 8; i++) {
        if (!mapFinals.includes(i)) {
            finalsPlayersWithPlaceholders.push(createPlaceholderPlayer(i, 1));
        }
    }

    // Ensure medals always has 3 slots
    const medalistPlayersWithPlaceholders = [...tournamentState.medalistPlayers];
    const mapMedals = tournamentState.medalistPlayers.map(player => player.nodeInfo.sourceNode);
    for (let i = 0; i < 3; i++) {
        if (!mapMedals.includes(i)) {
            medalistPlayersWithPlaceholders.push(createPlaceholderPlayer(i, 0));
        }
    }

    const handleAddMatch = () => {
        const newMatch: TournamentMatchDTO = {
            keyInfo: {
                tournament: 'a8d5c830-c275-41b0-a251-294eb61c007f', // Thay thế bằng ID giải đấu thực tế
                idCombination: combinationId || '',
                targetNode: 1,
                participants: players?.length || 0,
            },
            matchInfo: {
                tournamentType: 'POOMSAE',
            }
        };
        try {
            createTournamentMatch(newMatch).then((createdMatch) => {
                console.log("Match added to queue:", createdMatch);
                toast.success('Đã thêm trận đấu vào danh sách chờ', { position: "top-right", autoClose: 3000, theme: "colored" });
            }).catch((error) => {
                console.error("Error adding match:", error);
                toast.error('Lỗi khi thêm trận đấu vào danh sách chờ', { position: "top-right", autoClose: 3000, theme: "colored" });
            });
        } catch (error) {
            console.error("Error adding match:", error);
            toast.error('Lỗi khi thêm trận đấu vào danh sách chờ', { position: "top-right", autoClose: 3000, theme: "colored" });
        }
    }

    const menuItems: ContextMenuItem[] = [
        {
            label: 'Thêm trận đấu',
            onClick: handleAddMatch,
            icon: <UserPlus size={16} />,
            hint: 'Thêm trận đấu vào danh sách chờ'
        },
    ]

    return (
        <div className="round-robin-manager">
            <div className="tournament-header">
                <h2 className="tournament-title">🏆 Giải đấu Round Robin</h2>
                <div className="tournament-info">
                    <div className="info-item">
                        <span className="label">Tổng VĐV:</span>
                        <span className="value">{players?.length || 0}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Trạng thái:</span>
                        <span className={`value phase-${currentPhase}`}>
                            {currentPhase === 'qualifying' && '⚔️ Vòng loại'}
                            {currentPhase === 'finals' && '🥊 Chung kết'}
                            {currentPhase === 'completed' && '🎉 Hoàn thành'}
                            {currentPhase === 'not-started' && '⏳ Chưa bắt đầu'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Tournament Phases - 3 cột */}
            <div className="tournament-phases-grid">
                {/* Vòng loại - Cột 1 */}
                <div className="tournament-phase qualifying-phase">
                    <div className="phase-header">
                        <ContextMenu items={menuItems}>
                            <h3 className="phase-title">⚔️ Vòng loại</h3>
                        </ContextMenu>
                        <p className="phase-description">
                            Chọn những vận động viên xuất sắc nhất để lên chung kết.
                        </p>
                    </div>
                    <div className="groups-grid">
                        <RoundRobinGroup
                            players={tournamentState.qualifyingGroups}
                            levelNode={2}
                            onRefresh={onRefresh}
                        />
                    </div>
                </div>

                {/* Chung kết - Cột 2 */}
                <div className="tournament-phase finals-phase">
                    <div className="phase-header">
                        <ContextMenu items={menuItems}>
                            <h3 className="phase-title">🥊 Chung kết</h3>
                        </ContextMenu>
                        <p className="phase-description">
                            Chọn 3 người để xác định huy chương.
                        </p>
                    </div>
                    <div className="finals-container">
                        <RoundRobinGroup
                            players={finalsPlayersWithPlaceholders}
                            levelNode={1}
                            onRefresh={onRefresh}
                        />
                    </div>
                </div>

                {/* Huy chương - Cột 3 */}
                <div className="tournament-phase medals-phase">
                    <div className="phase-header">
                        <ContextMenu items={menuItems}>
                            <h3 className="phase-title">🏅 Bảng xếp hạng cuối cùng</h3>
                        </ContextMenu>
                        <p className="phase-description">
                            Kết quả cuối cùng của giải đấu Round Robin.
                        </p>
                    </div>
                    <div className="medals-container">
                        <RoundRobinGroup
                            players={medalistPlayersWithPlaceholders}
                            levelNode={0}
                            onRefresh={onRefresh}
                        />
                    </div>
                </div>
            </div>

            {/* Tournament Progress */}
            <div className="tournament-progress">
                <div className="progress-bar">
                    <div
                        className={`progress-step ${currentPhase !== 'not-started' ? 'completed' : ''}`}
                        data-step="1"
                    >
                        Vòng loại
                    </div>
                    <div
                        className={`progress-step ${['finals', 'completed'].includes(currentPhase) ? 'completed' : ''}`}
                        data-step="2"
                    >
                        Chung kết
                    </div>
                    <div
                        className={`progress-step ${currentPhase === 'completed' ? 'completed' : ''}`}
                        data-step="3"
                    >
                        Huy chương
                    </div>
                </div>
            </div>
        </div>
    );
}