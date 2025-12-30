import React from 'react';
import './NodeGroup.scss'
import { toast } from 'react-toastify';
import { ArrowBigRight, UserPlus } from 'lucide-react';

import type { HistoryInfo } from '@/types/tournament/TournamentType';
import type { TournamentMatchDTO } from '@/types/tournament/TournamentMatchType';

import type { ContextMenuItem } from '@/utils/ContextMenu';
import { isPoomsaeHistory } from '@/utils/PoomsaeCheck';
import ContextMenu from '@/utils/ContextMenu';

import { createTournamentMatch } from '@/api/tournament/TournamentMatchAPI';

import Node from "./Node";
import PlayerNode from "./PlayerNode";
import YesNoQuestion from './YesNoQuestion';

interface NodeGroupProps {
    player1?: HistoryInfo;
    player2?: HistoryInfo;
    numberMatch?: number;
    targetNode?: number;
    participants?: number;
    content?: string;
    onRefresh?: () => Promise<void>;
}

type ModalMode = 'winner' | 'delete';

const NodeGroup = React.memo(function NodeGroup({ player1, player2, numberMatch, targetNode, participants, content, onRefresh }: NodeGroupProps) {
    const [showConfirmModal, setShowConfirmModal] = React.useState<boolean>(false);
    const [selectedPlayer, setSelectedPlayer] = React.useState<HistoryInfo | null>(null);
    const [modalMode, setModalMode] = React.useState<ModalMode>('winner');

    /**
     * Handles winner selection for a player
     */
    const handleChooseWinner = React.useCallback((player: HistoryInfo) => {
        console.log("Chosen winner:", player.student.name);
        setSelectedPlayer(player);
        setModalMode('winner');
        setShowConfirmModal(true);
    }, []);

    /**
     * Handles delete request for a player
     */
    const handleDeleteNode = React.useCallback((player: HistoryInfo) => {
        console.log("Delete node for player:", player.student.name);
        setSelectedPlayer(player);
        setModalMode('delete');
        setShowConfirmModal(true);
    }, []);

    /**
     * Handles confirmation of winner or delete action
     */
    const handleConfirmAction = React.useCallback(async () => {
        if (!selectedPlayer) return;

        if (modalMode === 'winner') {
            // TODO: Implement winner logic
            console.log("Winner confirmed:", selectedPlayer.student.name);
        } else {
            // TODO: Implement delete logic
            console.log("Node deletion confirmed:", selectedPlayer.student.name);
        }

        setShowConfirmModal(false);
        setSelectedPlayer(null);

        // Re-fetch data sau khi thay đổi
        if (onRefresh) {
            await onRefresh();
        }
    }, [modalMode, selectedPlayer, onRefresh]);

    /**
     * Handles cancellation of modal
     */
    const handleCancelSelection = React.useCallback(() => {
        setShowConfirmModal(false);
        setSelectedPlayer(null);
    }, []);


    const handleAddMatch = () => {
        const isPoomsae = isPoomsaeHistory(player1 ? player1 : player2 ? player2 : null);
        const newMatch: TournamentMatchDTO = {
            keyInfo: {
                tournament: 'a8d5c830-c275-41b0-a251-294eb61c007f', // Thay thế bằng ID giải đấu thực tế
                // idCombination: isPoomsae
                //     ? (player1?.referenceInfo.poomsaeCombination ?? player2?.referenceInfo.poomsaeCombination ?? '')
                //     : (player1?.referenceInfo.sparringCombination ?? player2?.referenceInfo.sparringCombination ?? ''),
                targetNode: targetNode !== undefined ? targetNode : 0,
                participants: participants !== undefined ? participants : 0,
            },
            matchInfo: {
                tournamentType: isPoomsae ? 'POOMSAE' : 'SPARRING',
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

    /**
     * Renders the match number if applicable
     */
    const renderMatchNumber = () => {
        if (targetNode !== undefined) {
            return (
                <ContextMenu items={menuItems}>
                    <div className="match-number" style={{ cursor: 'pointer' }}>
                        {targetNode === -1 ? `Trận tranh Đồng`
                            : targetNode === 0 ? `Trận Chung Kết` // Trận tranh Huy Chương Vàng
                                : `Trận ${numberMatch}`}
                    </div>
                </ContextMenu>
            );
        }
        return null;
    };

    /**
     * Renders the winner node
     */
    const renderWinnerNode = () => {
        const winner = player1?.hasWon ? player1 : player2?.hasWon ? player2 : undefined;
        return (
            <Node
                nodeStatus="won"
                targetNode={targetNode}
                participants={participants}
                player={winner}
                onRefresh={onRefresh}
            />
        );
    };

    // Tạo class CSS động dựa trên targetNode
    const getNodeGroupClass = () => {
        let baseClass = 'node-group-container';

        if (targetNode === -1) {
            baseClass += ' bronze-match-highlight'; // Tranh đồng hạng 3
        } else if (targetNode === 0) {
            baseClass += ' final-match-highlight';  // Chung kết tranh vàng
        }

        return baseClass;
    };

    return (
        <div className={getNodeGroupClass()} >
            {renderMatchNumber()}

            <div className='node-group'>
                <div className='node-pair'>
                    <PlayerNode
                        player={player1}
                        nodeStatus={player1 ? 'chung' : 'waiting'}
                        participants={participants}
                        onChooseWinner={handleChooseWinner}
                        onDeleteNode={handleDeleteNode}
                        content={content}
                        onRefresh={onRefresh}
                    />

                    <div className='vs' />

                    <PlayerNode
                        player={player2}
                        nodeStatus={player2 ? 'hong' : 'waiting'}
                        participants={participants}
                        onChooseWinner={handleChooseWinner}
                        onDeleteNode={handleDeleteNode}
                        content={content}
                        onRefresh={onRefresh}
                    />
                </div>

                <ArrowBigRight />

                {renderWinnerNode()}
            </div>

            <YesNoQuestion
                isOpen={showConfirmModal}
                mode={modalMode}
                player={selectedPlayer}
                participants={participants}
                onConfirm={handleConfirmAction}
                onCancel={handleCancelSelection}
            />
        </div>
    )
});

export default NodeGroup;