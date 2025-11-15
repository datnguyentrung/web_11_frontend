import type Bxh from '../../../../types/bxh';
import BxhRank from '../BxhRank/BxhRank';
import './BxhCard.scss';

interface BxhCardProps {
    player: Bxh;
    isTopThree?: boolean;
}

export default function BxhCard({ player, isTopThree = false }: BxhCardProps) {
    const getLevelColor = (level: number): string => {
        if (level >= 5) return 'gold';
        if (level >= 4) return 'silver';
        if (level >= 3) return 'bronze';
        return 'default';
    };

    const formatTime = (time: number): string => {
        if (time >= 60) {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return seconds > 0 ? `${minutes} phút ${seconds} giây` : `${minutes} phút`;
        }
        return `${time} giây`;
    };

    return (
        <div className={`bxh-card ${isTopThree ? 'bxh-card--top-three' : ''} bxh-card--rank-${player.rank}`}>
            <div className="bxh-card__background">
                <img src="/taekwondo.jpg" alt="Taekwondo background" className="bxh-card__bg-image" />
                <div className="bxh-card__overlay"></div>
            </div>

            <div className="bxh-card__rank-section">
                <BxhRank rank={player.rank} isTopThree={isTopThree} />
            </div>

            <div className="bxh-card__content">
                <div className="bxh-card__header">
                    <h3 className="bxh-card__name">{player.name}</h3>
                    <div className={`bxh-card__level bxh-card__level--${getLevelColor(player.level)}`}>
                        <span className="bxh-card__level-icon">🥋</span>
                        <span className="bxh-card__level-text">Cấp {player.level}</span>
                    </div>
                </div>

                <div className="bxh-card__stats">
                    <div className="bxh-card__stat">
                        <div className="bxh-card__stat-icon">🏆</div>
                        <div className="bxh-card__stat-content">
                            <span className="bxh-card__stat-label">Số lần chạy rút gối</span>
                            <span className="bxh-card__stat-value bxh-card__stat-value--primary">
                                {player.count.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="bxh-card__stat">
                        <div className="bxh-card__stat-icon">⏱️</div>
                        <div className="bxh-card__stat-content">
                            <span className="bxh-card__stat-label">Thời gian</span>
                            <span className="bxh-card__stat-value">
                                {formatTime(player.time)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {isTopThree && (
                <div className="bxh-card__decoration">
                    <div className="bxh-card__glow"></div>
                    <div className="bxh-card__particles">
                        <span>✨</span>
                        <span>✨</span>
                        <span>✨</span>
                    </div>
                </div>
            )}
        </div>
    );
}