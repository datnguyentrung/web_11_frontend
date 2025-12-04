import React from 'react';
import type { PoomsaeHistory } from '@/types/tournament/PoomsaeType';
import './RoundRobinGroup.scss';
import ContextMenu from '@/utils/ContextMenu';
import type { ContextMenuItem } from '@/utils/ContextMenu';
import { Crown, Trash } from 'lucide-react';
import YesNoQuestion from './YesNoQuestion';
import { createPoomsaeRoundRobinWinner, deletePoomsaeHistoryForRoundRobin } from '@/services/tournament/Poomsae/PoomsaeHistoryService';

type Props = {
    players: (PoomsaeHistory)[];
    levelNode: number;
    participants?: number;
    content?: string;
    onRefresh?: () => Promise<void>;
}

export default function RoundRobinGroup({
    players,
    levelNode,
    onRefresh,
}: Props) {
    const [selectedPlayers, setSelectedPlayers] = React.useState<PoomsaeHistory | null>(null);
    const [groupResults, setGroupResults] = React.useState<{ [playerId: string]: { wins: number, losses: number, points: number } }>({});
    const [showYesNoQuestion, setShowYesNoQuestion] = React.useState(false);
    const [currentPlayer, setCurrentPlayer] = React.useState<PoomsaeHistory | null>(null);
    const [actionType, setActionType] = React.useState<'winner' | 'delete'>('winner');
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    // Ref để target chính xác component này cho overlay
    const componentRef = React.useRef<HTMLDivElement>(null);

    // console.log('levelNode: ', levelNode);
    // console.log('players: ', players);

    // Initialize group results
    React.useEffect(() => {
        const initialResults: { [playerId: string]: { wins: number, losses: number, points: number } } = {};
        players.forEach(player => {
            const playerId = player.idPoomsaeHistory;
            initialResults[playerId] = { wins: 0, losses: 0, points: 0 };
        });
        setGroupResults(initialResults);
    }, [players]);

    // Show local success message without page reload
    const showSuccessMessage = React.useCallback((message: string) => {
        // Tạo toast notification local
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }, []);

    // Listen for tournament events để update UI mà không cần re-render toàn bộ
    React.useEffect(() => {
        const handlePlayerMoved = (event: CustomEvent) => {
            const { toLevel, targetNode, player } = event.detail;

            // Nếu event này dành cho level hiện tại (incoming player)
            if (toLevel === levelNode) {
                console.log(`✨ Level ${levelNode} preparing slot for incoming player at position ${targetNode}:`, player?.referenceInfo?.name);

                // Animate incoming player slot - tìm placeholder slot
                const placeholderSlot = document.querySelector(`[data-level="${levelNode}"][data-target-node="${targetNode}"].placeholder`);
                if (placeholderSlot) {
                    placeholderSlot.classList.add('incoming-player');

                    // Show local notification
                    showSuccessMessage(`Sẵn sàng đón ${player?.referenceInfo?.name} tại vị trí ${targetNode + 1}!`);

                    setTimeout(() => {
                        placeholderSlot.classList.remove('incoming-player');
                    }, 2000);
                }
            }
        };

        const handlePlayerDeleted = (event: CustomEvent) => {
            const { level, playerId } = event.detail;

            // Nếu event này dành cho level hiện tại
            if (level === levelNode) {
                console.log(`✨ Level ${levelNode} handling deletion:`, playerId);

                // Animate deletion - chỉ local animation, không reload
                const playerCard = document.querySelector(`[data-player-id="${playerId}"]`);
                if (playerCard) {
                    playerCard.classList.add('deleting');
                    setTimeout(() => {
                        playerCard.classList.remove('deleting');
                        // Có thể thêm placeholder slot nếu cần
                    }, 500);
                }
            }
        };        // Add event listeners
        window.addEventListener('tournament-player-moved', handlePlayerMoved as EventListener);
        window.addEventListener('tournament-player-deleted', handlePlayerDeleted as EventListener);

        // Cleanup
        return () => {
            window.removeEventListener('tournament-player-moved', handlePlayerMoved as EventListener);
            window.removeEventListener('tournament-player-deleted', handlePlayerDeleted as EventListener);
        };
    }, [levelNode, showSuccessMessage]);

    const getGroupTitle = () => {
        if (levelNode === 2) return `Vòng loại`; // A, B, C, ...
        if (levelNode === 1) return `Chung kết`;
        return `Huy chương`;
    };

    const getGroupDescription = () => {
        if (levelNode === 2) return `Vòng loại - Chọn 8 vận động viên/đội xuất sắc nhất`;
        if (levelNode === 1) return `Chung kết - Chọn 3 vận động viên cho huy chương`;
        return `Kết quả cuối cùng`;
    };

    const handleChooseWinner = (player: PoomsaeHistory) => {
        return () => {
            setCurrentPlayer(player);
            setActionType('winner');
            setShowYesNoQuestion(true);
        }
    };

    const handleDelete = (player: PoomsaeHistory) => {
        setCurrentPlayer(player);
        setActionType('delete');
        setShowYesNoQuestion(true);
    };

    const handleCloseModal = () => {
        setShowYesNoQuestion(false);
        setCurrentPlayer(null);
    };

    const handleConfirmAction = async (targetNode?: number, updatedPlayer?: PoomsaeHistory) => {
        if (!currentPlayer) return;

        setIsRefreshing(true);

        // Optimistic update: Update UI immediately
        const optimisticUpdate = () => {
            if (actionType === 'winner' && targetNode !== undefined && updatedPlayer) {
                // Animate the player moving to next level
                const playerCard = document.querySelector(`[data-player-id="${currentPlayer.idPoomsaeHistory}"]`);
                if (playerCard) {
                    playerCard.classList.add('moving-to-next-level');
                }
            }
        };

        try {
            // Apply optimistic update
            optimisticUpdate();

            if (actionType === 'winner') {
                if (targetNode !== undefined && updatedPlayer) {
                    console.log('updatedPlayer: ', updatedPlayer);
                    await createPoomsaeRoundRobinWinner(updatedPlayer);
                    console.log('Winner created successfully:', updatedPlayer.referenceInfo?.name, 'to position:', targetNode);

                    // Update local UI ngay lập tức mà không reload trang
                    updateUIAfterWinner(currentPlayer, targetNode);
                }
            } else if (actionType === 'delete') {
                await deletePoomsaeHistoryForRoundRobin(currentPlayer.idPoomsaeHistory);
                console.log('Player deleted successfully:', currentPlayer.referenceInfo?.name);

                // Update local UI ngay lập tức mà không reload trang
                updateUIAfterDelete(currentPlayer.idPoomsaeHistory);
            }

            // Trigger events cho other components AND refresh data smoothly
            triggerCrossComponentEvents(targetNode, actionType);

            // Smooth refresh sau khi animation hoàn thành
            await smoothRefreshWithAnimation();

        } catch (error) {
            console.error('Error performing action:', error);
            // Rollback optimistic update on error
            const playerCard = document.querySelector(`[data-player-id="${currentPlayer.idPoomsaeHistory}"]`);
            if (playerCard) {
                playerCard.classList.remove('moving-to-next-level');
            }
        } finally {
            setIsRefreshing(false);
            handleCloseModal();
        }
    };

    // Update UI locally after winner selection (NO PAGE RELOAD)
    const updateUIAfterWinner = (player: PoomsaeHistory, targetNode: number) => {
        console.log(`Updating local UI after winner selection - NO RELOAD, moving to position ${targetNode}`);

        // 1. Animate current player as "promoted"
        setTimeout(() => {
            const playerCard = document.querySelector(`[data-player-id="${player.idPoomsaeHistory}"]`);
            if (playerCard) {
                playerCard.classList.add('promoted');
                playerCard.classList.remove('moving-to-next-level');
            }
        }, 600);

        // 2. Show success message locally với targetNode info
        const nextLevelName = levelNode === 2 ? 'Chung kết' : 'Huy chương';
        showSuccessMessage(`${player.referenceInfo?.name} đã vào ${nextLevelName} (vị trí ${targetNode + 1})!`);
    };

    // Update UI locally after deletion (NO PAGE RELOAD)
    const updateUIAfterDelete = (playerId: string) => {
        console.log('Updating local UI after deletion - NO RELOAD');

        // 1. Animate deletion immediately
        const playerCard = document.querySelector(`[data-player-id="${playerId}"]`);
        if (playerCard) {
            playerCard.classList.add('deleting');
        }

        // 2. Show success message locally
        showSuccessMessage('Đã xóa thành công!');
    };

    // Trigger events for other components but DON'T reload page
    const triggerCrossComponentEvents = (targetNode?: number, actionType?: 'winner' | 'delete') => {
        if (actionType === 'winner' && targetNode !== undefined) {
            // Chỉ notify other components, KHÔNG reload
            const nextLevel = levelNode - 1;
            const event = new CustomEvent('tournament-player-moved', {
                detail: {
                    fromLevel: levelNode,
                    toLevel: nextLevel,
                    targetNode: targetNode,
                    player: currentPlayer
                }
            });
            window.dispatchEvent(event);

            console.log(`✨ Notified other components: ${levelNode} → ${nextLevel}, NO RELOAD`);

        } else if (actionType === 'delete') {
            const event = new CustomEvent('tournament-player-deleted', {
                detail: {
                    level: levelNode,
                    playerId: currentPlayer?.idPoomsaeHistory
                }
            });
            window.dispatchEvent(event);

            console.log(`✨ Notified components about deletion, NO RELOAD`);
        }
    };

    // Smooth refresh with animation overlay - no flash
    const smoothRefreshWithAnimation = async () => {
        if (!onRefresh) return;

        console.log('🔄 Starting smooth refresh with animation overlay...');

        // 1. Add overlay để che phủ trong lúc refresh
        const overlay = document.createElement('div');
        overlay.className = 'smooth-refresh-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(2px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
            animation: fadeIn 0.3s ease-out;
        `;

        const spinner = document.createElement('div');
        spinner.innerHTML = '🔄 Đang cập nhật...';
        spinner.style.cssText = `
            background: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            font-weight: 500;
            animation: pulse 0.8s infinite;
        `;
        overlay.appendChild(spinner);

        // 2. Add overlay to current component using ref
        if (componentRef.current) {
            componentRef.current.appendChild(overlay);
        }

        // 3. Wait để user thấy animation và các animation khác hoàn thành
        await new Promise(resolve => setTimeout(resolve, 600));

        try {
            // 4. Gọi onRefresh để lấy dữ liệu mới từ server
            await onRefresh();
            console.log('✅ Data refreshed successfully - dữ liệu đã được cập nhật');

            // 5. Wait thêm để đảm bảo UI được render hoàn toàn
            await new Promise(resolve => setTimeout(resolve, 300));

        } catch (error) {
            console.error('❌ Refresh failed:', error);
        } finally {
            // 6. Remove overlay
            if (overlay && overlay.parentNode) {
                overlay.style.animation = 'fadeOut 0.3s ease-in';
                setTimeout(() => overlay.remove(), 300);
            }
        }

        console.log('✨ Smooth refresh completed');
    };

    const getMenuItems = (player: PoomsaeHistory): ContextMenuItem[] => [
        {
            label: "Chiến thắng",
            onClick: handleChooseWinner(player),
            icon: <Crown size={16} />,
            hint: "Ctrl+I"
        },
    ]

    const playerMap = players.reduce((acc, player): Record<number, PoomsaeHistory> => {
        const key = player.nodeInfo.sourceNode;
        acc[key] = player;
        return acc;
    }, {});
    // if (levelNode === 1) {
    //     // console.log('Finals Player Map: ', playerMap);
    //     console.log('players: ', players);
    // }

    return (
        <div ref={componentRef} className={`round-robin-group level-${levelNode}`}>
            <div className="group-header">
                <h4 className="group-title">{getGroupTitle()}</h4>
                <p className="group-description">{getGroupDescription()}</p>
            </div>

            <div className={`players-container ${levelNode === 1 ? 'finals-grid' : levelNode === 0 ? 'medals-grid' : ''}`}>
                {Object.entries(playerMap)
                    .sort(([aKey], [bKey]) => Number(aKey) - Number(bKey)) // sắp theo key (sourceNode)
                    .map(([key, player], index) => {

                        // if (levelNode === 1 && player.nodeInfo.sourceNode) {
                        //     console.log('Finals Player: ', player);
                        // }

                        // console.log(`Rendering player at index ${index}: ${player.referenceInfo?.name || 'Unknown'} with sourceNode: ${player.nodeInfo.sourceNode}`);
                        const playerId = player.idPoomsaeHistory || '';
                        const isPlaceholder = playerId.startsWith('placeholder-');
                        const isSelected = selectedPlayers && (selectedPlayers.idPoomsaeHistory === playerId);
                        const results = groupResults[playerId] || { wins: 0, losses: 0, points: 0 };

                        return (
                            <div
                                key={key}
                                data-player-id={playerId}
                                data-target-node={player.nodeInfo.sourceNode}
                                data-level={levelNode}
                                className={`player-card ${isSelected ? 'selected' : ''} ${(levelNode > 0 && !isPlaceholder) ? 'selectable' : ''} ${isPlaceholder ? 'placeholder waiting' : ''} ${isRefreshing && selectedPlayers?.idPoomsaeHistory === playerId ? 'updating' : ''}`}
                            >
                                <div className="player-rank">#{index + 1}</div>
                                <div className="player-info">
                                    <div className="player-main-info">
                                        <ContextMenu items={getMenuItems(player)}>
                                            <div className="player-name"
                                                onClick={() => {
                                                    console.log('Click on player:', player.referenceInfo?.name, 'levelNode:', levelNode, 'isPlaceholder:', isPlaceholder);
                                                    if (levelNode > 0 && !isPlaceholder) {
                                                        setSelectedPlayers(player);
                                                    }
                                                }}
                                            >
                                                {isPlaceholder ? 'Đang chờ...' :
                                                    !player.referenceInfo?.name || player.referenceInfo.name.trim() === '' ?
                                                        'Nhập họ và tên' :
                                                        player.referenceInfo.name}
                                            </div>
                                        </ContextMenu>
                                        {!isPlaceholder && (
                                            <div className="player-details">
                                                <span className="player-id">
                                                    ID: {playerId}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {!isPlaceholder && (
                                        <Trash
                                            onClick={() => handleDelete(player)}
                                            size={14}
                                            className="delete-icon"
                                        />
                                    )}
                                </div>

                                {levelNode > 0 && !isPlaceholder && (
                                    <div className="player-stats">
                                        <div className="stat">
                                            <span className="stat-label">Thắng</span>
                                            <span className="stat-value wins">{results.wins}</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-label">Thua</span>
                                            <span className="stat-value losses">{results.losses}</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-label">Điểm</span>
                                            <span className="stat-value points">{results.points}</span>
                                        </div>
                                    </div>
                                )}

                                {levelNode === 0 && (
                                    <div className="medal-indicator">
                                        {index === 0 && (isPlaceholder ? '🥇' : '🥇')}
                                        {index === 1 && (isPlaceholder ? '🥈' : '🥈')}
                                        {index === 2 && (isPlaceholder ? '🥉' : '🥉')}
                                    </div>
                                )}
                            </div>
                        );
                    })
                }

            </div>



            <div className="group-info">
                <div className="group-meta">
                    {/* <span>Target Node: {targetNode}</span> */}
                    <span>Level: {levelNode}</span>
                    <span>Players: {players.length}</span>
                </div>
            </div>

            <YesNoQuestion
                isOpen={showYesNoQuestion}
                onClose={handleCloseModal}
                onConfirm={handleConfirmAction}
                player={currentPlayer}
                levelNode={levelNode}
                actionType={actionType}
            />

            {/* Loading overlay khi đang refresh */}
            {isRefreshing && (
                <div className="refresh-loading-overlay">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Đang cập nhật...</p>
                    </div>
                </div>
            )}
        </div>
    );
}