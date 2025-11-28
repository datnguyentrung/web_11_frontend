import './SkillLevel.scss';
import { useEffect, useState } from 'react';
import type { TheLuc } from '../../types/bxh';
import { loadThelucData } from '../../utils/theluc';


export default function SkillLevel() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bangTheLuc, setBangTheLuc] = useState<TheLuc[]>([]);

    useEffect(() => {
        const loadAllData = async () => {
            try {
                const bxhData = await loadThelucData();
                setBangTheLuc(bxhData);

                // Simulate loading time
                await new Promise(resolve => setTimeout(resolve, 500));
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi load dữ liệu:', error);
                setError('Không thể tải dữ liệu bảng quy đổi trình độ');
                setLoading(false);
            }
        };

        loadAllData();
    }, []);

    const getLevelBadgeClass = (level: number) => {
        if (level === 0) return 'skill-level__badge--beginner';
        if (level >= 1 && level <= 5) return 'skill-level__badge--bronze';
        if (level >= 6 && level <= 10) return 'skill-level__badge--silver';
        if (level >= 11 && level <= 15) return 'skill-level__badge--gold';
        if (level >= 16 && level <= 20) return 'skill-level__badge--platinum';
        return 'skill-level__badge--diamond';
    };

    const getLevelTitle = (level: number) => {
        if (level === 0) return 'Khởi đầu';
        if (level >= 1 && level <= 5) return 'Đồng';
        if (level >= 6 && level <= 10) return 'Bạc';
        if (level >= 11 && level <= 15) return 'Vàng';
        if (level >= 16 && level <= 20) return 'Bạch kim';
        return 'Kim cương';
    };

    if (loading) {
        return (
            <div className="skill-level">
                <div className="skill-level__loading">
                    <div className="skill-level__spinner"></div>
                    <p>Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="skill-level">
                <div className="skill-level__error">
                    <span className="skill-level__error-icon">⚠️</span>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="skill-level">
            <div className="skill-level__header">
                <h2 className="skill-level__title">Bảng quy đổi trình độ</h2>
                <p className="skill-level__subtitle">
                    Tiêu chuẩn đánh giá thể lực qua số lần và thời gian chạy rút gối
                </p>
            </div>

            <div className="skill-level__legend">
                <div className="skill-level__legend-item">
                    <div className="skill-level__legend-badge skill-level__badge--beginner">0</div>
                    <span>Khởi đầu</span>
                </div>
                <div className="skill-level__legend-item">
                    <div className="skill-level__legend-badge skill-level__badge--bronze">1-5</div>
                    <span>Đồng</span>
                </div>
                <div className="skill-level__legend-item">
                    <div className="skill-level__legend-badge skill-level__badge--silver">6-10</div>
                    <span>Bạc</span>
                </div>
                <div className="skill-level__legend-item">
                    <div className="skill-level__legend-badge skill-level__badge--gold">11-15</div>
                    <span>Vàng</span>
                </div>
                <div className="skill-level__legend-item">
                    <div className="skill-level__legend-badge skill-level__badge--platinum">16-20</div>
                    <span>Bạch kim</span>
                </div>
                <div className="skill-level__legend-item">
                    <div className="skill-level__legend-badge skill-level__badge--diamond">21-25</div>
                    <span>Kim cương</span>
                </div>
            </div>

            <div className="skill-level__table-container">
                <table className="skill-level__table">
                    <thead>
                        <tr>
                            <th>Trình độ</th>
                            <th>Hạng</th>
                            <th>Thời gian (phút)</th>
                            <th>Số lần rút gối</th>
                            <th>Trung bình 10s</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bangTheLuc.map((item) => (
                            <tr key={item.level} className="skill-level__row">
                                <td>
                                    <div className={`skill-level__badge ${getLevelBadgeClass(item.level)}`}>
                                        Cấp {item.level}
                                    </div>
                                </td>
                                <td>
                                    <span className="skill-level__rank-title">
                                        {getLevelTitle(item.level)}
                                    </span>
                                </td>
                                <td>
                                    <div className="skill-level__time">
                                        <span className="skill-level__time-icon">⏱️</span>
                                        {item.time} giây
                                    </div>
                                </td>
                                <td>
                                    <div className="skill-level__amount">
                                        <span className="skill-level__amount-value">{item.amount.toLocaleString()}</span>
                                        <span className="skill-level__amount-label">lần</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="skill-level__count10s">
                                        <span className="skill-level__count10s-value">{item.count10s}</span>
                                        <span className="skill-level__count10s-label">lần/10s</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="skill-level__info">
                <div className="skill-level__info-card">
                    <h3>📊 Cách tính điểm</h3>
                    <p>Trình độ được đánh giá dựa trên tổng số lần và thời gian chạy rút gối.</p>
                </div>
                <div className="skill-level__info-card">
                    <h3>🎯 Mục tiêu</h3>
                    <p>Duy trì tốc độ trung bình 10 giây để đạt hiệu quả tốt nhất trong mỗi cấp độ.</p>
                </div>
                <div className="skill-level__info-card">
                    <h3>⭐ Lưu ý</h3>
                    <p>Cần được HLV xác nhận để nâng cấp trình độ chính thức.</p>
                </div>
            </div>
        </div>
    );
}