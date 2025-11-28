import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Bxh } from '../../types/bxh';
import { getPlayerStats } from '../../utils/sortUtils';
import './BxhKyNang.scss';
import { loadBxhData } from '../../utils/bxh';
import BxhList from './BxhList/BxhList';

interface BxhKyNangProps {
    filterName: string;
    branch: string[];
    title?: string;
}

export default function BxhKyNang({
    filterName,
    branch,
    title = "Bảng Xếp Hạng Kỹ Năng Thể Lực - Tốc Độ"
}: BxhKyNangProps) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [players, setPlayers] = useState<Bxh[]>([]);

    // TODO: Sử dụng bangTheLuc để tính toán level
    // console.log('Bảng thể lực:', bangTheLuc);
    // console.log('Bảng xếp hạng:', players);

    useEffect(() => {
        const loadAllData = async () => {
            try {
                // SỬA Ở ĐÂY: Gọi trực tiếp hàm, bỏ "Promise."
                const bxhData = await loadBxhData();

                setPlayers(bxhData);

                // Simulate loading time
                await new Promise(resolve => setTimeout(resolve, 500));
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi load dữ liệu:', error);
                setError('Không thể tải dữ liệu bảng xếp hạng');
                setLoading(false);
            }
        };

        loadAllData();
    }, []);

    const stats = getPlayerStats(players);

    if (loading) {
        return (
            <div className="bxh-kynang">
                <div className="bxh-kynang__header">
                    <h2 className="bxh-kynang__title">{title}</h2>
                </div>
                <div className="bxh-kynang__loading">
                    <div className="bxh-kynang__loading-spinner"></div>
                    <p className="bxh-kynang__loading-text">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bxh-kynang">
                <div className="bxh-kynang__header">
                    <h2 className="bxh-kynang__title">{title}</h2>
                </div>
                <div className="bxh-kynang__error">
                    <div className="bxh-kynang__error-icon">⚠️</div>
                    <h3 className="bxh-kynang__error-title">Lỗi tải dữ liệu</h3>
                    <p className="bxh-kynang__error-text">{error}</p>
                    <button
                        className="bxh-kynang__error-retry"
                        onClick={() => window.location.reload()}
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bxh-kynang">
            <div className="bxh-kynang__header">
                <div className="bxh-kynang__title-section">
                    <h2 className="bxh-kynang__title">{title}</h2>
                    <button
                        className="bxh-kynang__reference-btn"
                        onClick={() => navigate('/skill-level-reference')}
                    >
                        <span className="bxh-kynang__reference-btn-icon">📋</span>
                        <span>Bảng quy đổi trình độ</span>
                        <span className="bxh-kynang__reference-btn-arrow">→</span>
                    </button>
                    <p className="bxh-kynang__subtitle">
                        Kết quả luyện tập và thi đấu của các vận động viên
                    </p>
                </div>

                <div className="bxh-kynang__stats-grid">
                    <div className="bxh-kynang__stat-card">
                        <span className="bxh-kynang__stat-value">{stats.total}</span>
                        <span className="bxh-kynang__stat-label">Lượt tham gia</span>
                    </div>
                    <div className="bxh-kynang__stat-card">
                        <span className="bxh-kynang__stat-value">{stats.maxAmount}</span>
                        <span className="bxh-kynang__stat-label">Số lần cao nhất</span>
                    </div>
                    <div className="bxh-kynang__stat-card">
                        <span className="bxh-kynang__stat-value">{stats.avgLevel}</span>
                        <span className="bxh-kynang__stat-label">Cấp độ trung bình</span>
                    </div>
                    <div className="bxh-kynang__stat-card">
                        <span className="bxh-kynang__stat-value">{stats.maxDuration} giây</span>
                        <span className="bxh-kynang__stat-label">Thời gian cao nhất</span>
                    </div>
                </div>
            </div>

            <div className="bxh-kynang__content">
                <BxhList
                    players={players
                        .filter(player => branch.length > 0 ? branch.includes(player.branch.toString()) : true)
                        .map((player, index) => ({ ...player, rank: index + 1 }))
                        .filter(player => filterName ? player.studentName.toLowerCase().includes(filterName.toLowerCase()) : true)
                    }
                    hasFilterName={!!filterName}
                />
            </div>

            <div className="bxh-kynang__footer">
                <p className="bxh-kynang__footer-text">
                    Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
                </p>
            </div>
        </div>
    );
}