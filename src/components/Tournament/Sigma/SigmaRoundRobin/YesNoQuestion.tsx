import React from 'react';
import type { PoomsaeHistory } from '@/types/tournament/PoomsaeType';
import { X, Check, Trophy, Trash2 } from 'lucide-react';
import './YesNoQuestion.scss';

type ActionType = 'winner' | 'delete';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (targetNode?: number, updatedPlayer?: PoomsaeHistory) => void;
    player: PoomsaeHistory | null;
    levelNode: number;
    actionType: ActionType;
}

export default function YesNoQuestion({
    isOpen,
    onClose,
    onConfirm,
    player,
    levelNode,
    actionType
}: Props) {
    const [selectedTargetNode, setSelectedTargetNode] = React.useState<number>(1);
    const [updatedPlayer, setUpdatedPlayer] = React.useState<PoomsaeHistory | null>(null);

    // Reset selected target when modal opens and create updated player copy
    React.useEffect(() => {
        if (isOpen && player) {
            setSelectedTargetNode(0);
            // Create a copy of player with updated targetNode
            setUpdatedPlayer({
                ...player,
                nodeInfo: {
                    ...player.nodeInfo,
                    targetNode: 0
                }
            });
        }
    }, [isOpen, player]);

    if (!isOpen || !player) return null;

    const getTitle = () => {
        if (actionType === 'delete') {
            return 'Xác nhận xóa';
        }
        return 'Chọn vị trí thắng cuộc';
    };

    const getMessage = () => {
        if (actionType === 'delete') {
            return `Bạn có chắc chắn muốn xóa "${player.referenceInfo?.name || 'Vận động viên'}" khỏi giải đấu?`;
        }
        return `Chọn vị trí cho "${player.referenceInfo?.name || 'Vận động viên'}" sẽ được thăng lên:`;
    };

    const getTargetOptions = () => {
        if (levelNode === 2) {
            // Vòng loại -> Chung kết (1-8)
            return Array.from({ length: 8 }, (_, i) => ({
                value: i,
                label: `Vị trí ${i + 1}`
            }));
        } else if (levelNode === 1) {
            // Chung kết -> Huy chương (0-1-2)
            return [
                { value: 0, label: '🥇 Vàng' },
                { value: 1, label: '🥈 Bạc' },
                { value: 2, label: '🥉 Đồng' }
            ];
        }
        return [];
    };

    const handleConfirm = () => {
        if (actionType === 'delete') {
            onConfirm();
        } else {
            onConfirm(selectedTargetNode, updatedPlayer || undefined);
        }
    };

    const targetOptions = getTargetOptions();

    return (
        <div className="yes-no-question-overlay">
            <div className="yes-no-question-modal">
                <div className="modal-header">
                    <div className="modal-icon">
                        {actionType === 'delete' ? (
                            <Trash2 size={24} className="text-red-500" />
                        ) : (
                            <Trophy size={24} className="text-yellow-500" />
                        )}
                    </div>
                    <h3 className="modal-title">{getTitle()}</h3>
                    <button
                        className="close-button"
                        onClick={onClose}
                        aria-label="Đóng"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <p className="modal-message">{getMessage()}</p>

                    {actionType === 'winner' && targetOptions.length > 0 && (
                        <div className="target-selection">
                            <label className="selection-label">
                                Chọn vị trí:
                            </label>
                            <div className="target-options">
                                {targetOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        className={`target-option ${selectedTargetNode === option.value ? 'selected' : ''}`}
                                        onClick={() => {
                                            setSelectedTargetNode(option.value);
                                            if (player) {
                                                setUpdatedPlayer({
                                                    ...player,
                                                    nodeInfo: {
                                                        ...player.nodeInfo,
                                                        targetNode: option.value
                                                    }
                                                });
                                            }
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-actions">
                    <button
                        className="btn-cancel"
                        onClick={onClose}
                    >
                        <X size={16} />
                        Hủy
                    </button>
                    <button
                        className={`btn-confirm ${actionType === 'delete' ? 'btn-delete' : 'btn-winner'}`}
                        onClick={handleConfirm}
                    >
                        <Check size={16} />
                        {actionType === 'delete' ? 'Xóa' : 'Xác nhận'}
                    </button>
                </div>
            </div>
        </div>
    );
}