import './YesNoQuestion.scss'
import { createPortal } from 'react-dom';
import React from 'react';

import type { HistoryInfo } from '@/types/tournament/TournamentType';

import { createPoomsaeEliminationWinner, deletePoomsaeHistoryForElimination } from '@/api/tournament/Poomsae/PoomsaeHistoryAPI';
import { createSparringWinner, deleteSparringHistory } from '@/api/tournament/Sparring/SparringHistoryAPI';

type ModalMode = 'winner' | 'delete';

type Props = {
    isOpen: boolean;
    mode: ModalMode;
    player: HistoryInfo | null;
    participants?: number;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function YesNoQuestion({ isOpen, mode, player, participants, onConfirm, onCancel }: Props) {
    // Xử lý phím ESC để đóng modal
    React.useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCancel();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            // Ngăn scroll body khi modal mở
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onCancel]);

    if (!isOpen || !player) return null;

    const handleConfirm = async () => {
        try {
            if ('idPoomsaeHistory' in player) {
                // player là PoomsaeHistory
                if (mode === 'winner') {
                    await createPoomsaeEliminationWinner(player.idHistory, participants || 0);
                    console.log('Poomsae winner confirmed:', player.student?.name);
                } else if (mode === 'delete') {
                    await deletePoomsaeHistoryForElimination(player.idHistory);
                    console.log('Poomsae node deletion confirmed for:', player.student?.name);
                }
            }
            else if ('idSparringHistory' in player) {
                // player là SparringHistory
                if (mode === 'winner') {
                    await createSparringWinner(player.idHistory, participants || 0);
                    console.log('Sparring winner confirmed:', player.student?.name);
                } else if (mode === 'delete') {
                    await deleteSparringHistory(player.idHistory);
                    console.log('Sparring node deletion confirmed for:', player.student?.name);
                }
            }

            onConfirm();
        } catch (error) {
            console.error('Error in handleConfirm:', error);
        }
    };

    // Tạo nội dung động dựa trên mode
    const getModalContent = () => {
        if (mode === 'winner') {
            return {
                title: 'Xác nhận kết quả',
                message: `Xác nhận người chơi được chọn là người thắng?`,
                confirmText: 'Xác nhận',
                confirmClass: 'btn-confirm-winner'
            };
        } else {
            return {
                title: 'Hủy kết quả thắng',
                message: `Bạn xác nhận xóa trạng thái thắng ?`,
                confirmText: 'Hoàn tác',
                confirmClass: 'btn-confirm-delete'
            };
        }
    };

    const modalContent = getModalContent();

    // Xử lý click outside để đóng modal
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    return createPortal(
        <div className="yes-no-modal-overlay" onClick={handleOverlayClick}>
            <div className={`yes-no-modal ${mode === 'delete' ? 'delete-mode' : 'winner-mode'}`}>
                <div className="modal-header">
                    <h3>{modalContent.title}</h3>
                </div>

                <div className="modal-content">
                    <p>{modalContent.message}</p>

                    <div className="player-info">
                        <div className="player-details">
                            <span className="player-name">{player.student.name}</span>
                            <span className="player-id">
                                ID: {player.idHistory}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onCancel}>
                        Đóng
                    </button>
                    <button className={`btn-confirm ${modalContent.confirmClass}`} onClick={handleConfirm}>
                        {modalContent.confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}