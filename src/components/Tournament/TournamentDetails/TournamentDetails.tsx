import './TournamentDetails.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    Trophy,
    Calendar,
    MapPin,
    Users,
    Award,
    Clock
} from 'lucide-react';
import type { Tournament as TournamentType } from '@/types/tournament/TournamentType';
import { TournamentStateLabel, TournamentScopeLabel } from '@/enums/Tournament';
import TournamentDetailsSidebar from './TournamentDetailsSidebar/TournamentDetailsSidebar';
import { getTournamentById } from '@/api/tournament/TournamentAPI';

export default function TournamentDetails() {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    const [tournament, setTournament] = useState<TournamentType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!tournamentId) {
            console.warn("No tournament ID provided in the URL.");
            return;
        }

        const fetchTournamentDetails = async () => {
            try {
                setLoading(true);
                const data = await getTournamentById(tournamentId);
                setTournament(data);
            } catch (error) {
                console.error("Failed to fetch tournament details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTournamentDetails();
    }, [tournamentId]);

    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleDateString('vi-VN', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getStateClass = (state: string) => {
        switch (state) {
            case 'ONGOING': return 'ongoing';
            case 'UPCOMING': return 'upcoming';
            case 'COMPLETED': return 'completed';
            default: return '';
        }
    };

    if (loading) {
        return (
            <div className="tournament-details__loading">
                <div className="text-center">
                    <div className="spinner"></div>
                    <p>Đang tải thông tin giải đấu...</p>
                </div>
            </div>
        );
    }

    if (!tournament) {
        return (
            <div className="tournament-details__loading">
                <div className="text-center">
                    <p>Không tìm thấy thông tin giải đấu</p>
                </div>
            </div>
        );
    }

    return (
        <div className="tournament-details">
            {/* Title Section */}
            <div className="tournament-details__title">
                <div className="container">
                    <div className="content">
                        <div className="icon-container">
                            <Trophy className="icon" />
                        </div>
                        <div className="info">
                            <div className="badges">
                                <span className={`badge badge--state ${getStateClass(tournament.tournamentState)}`}>
                                    {TournamentStateLabel[tournament.tournamentState]}
                                </span>
                                <span className="badge badge--scope">
                                    {TournamentScopeLabel[tournament.tournamentScope]}
                                </span>
                            </div>
                            <h2>{tournament.tournamentName}</h2>
                            <div className="meta">
                                <div className="meta-item">
                                    <Calendar className="icon" />
                                    <span>{formatDate(tournament.tournamentDate)}</span>
                                </div>
                                {tournament.location && (
                                    <div className="meta-item">
                                        <MapPin className="icon" />
                                        <span>{tournament.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="tournament-details__body">
                <div className="grid">
                    {/* Main Content */}
                    <div className="tournament-details__content">
                        {/* Overview Stats */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="content">
                                    <div className="icon-container icon-container--blue">
                                        <Users className="icon" />
                                    </div>
                                    <div className="text">
                                        <p className="label">Vận động viên</p>
                                        <p className="value">248 người</p>
                                    </div>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="content">
                                    <div className="icon-container icon-container--purple">
                                        <Award className="icon" />
                                    </div>
                                    <div className="text">
                                        <p className="label">Hạng đấu</p>
                                        <p className="value">16 hạng</p>
                                    </div>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="content">
                                    <div className="icon-container icon-container--green">
                                        <Clock className="icon" />
                                    </div>
                                    <div className="text">
                                        <p className="label">Thời gian</p>
                                        <p className="value">3 ngày</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tournament Information */}
                        <div className="card">
                            <h3>Thông Tin Giải Đấu</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <p className="label">Đơn vị tổ chức</p>
                                    <p className="value">Liên đoàn Taekwondo Việt Nam</p>
                                </div>
                                <div className="info-item">
                                    <p className="label">Thể thức thi đấu</p>
                                    <p className="value">Loại trực tiếp</p>
                                </div>
                                <div className="info-item">
                                    <p className="label">Độ tuổi tham gia</p>
                                    <p className="value">16 tuổi trở lên</p>
                                </div>
                                <div className="info-item">
                                    <p className="label">Trọng tài chính</p>
                                    <p className="value">Nguyễn Văn A (WTF Level 4)</p>
                                </div>
                            </div>
                        </div>

                        {/* Weight Categories */}
                        <div className="card">
                            <h3>Hạng Cân Thi Đấu</h3>
                            <div className="weight-grid">
                                {['54kg', '58kg', '63kg', '68kg', '74kg', '80kg', '87kg', '+87kg'].map((weight) => (
                                    <div key={weight} className="weight-card">
                                        <p className="weight">{weight}</p>
                                        <p className="count">{Math.floor(Math.random() * 20 + 10)} VĐV</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Schedule */}
                        <div className="card">
                            <h3>Lịch Thi Đấu</h3>
                            <div className="schedule">
                                <div className="schedule-item">
                                    <div className="date-badge date-badge--red">
                                        <div className="day">05</div>
                                        <div className="month">Tháng 12</div>
                                    </div>
                                    <div className="info">
                                        <p className="title">Ngày 1: Vòng loại</p>
                                        <p className="description">8:00 - 18:00 | Thi đấu vòng loại các hạng cân</p>
                                    </div>
                                </div>
                                <div className="schedule-item">
                                    <div className="date-badge date-badge--orange">
                                        <div className="day">06</div>
                                        <div className="month">Tháng 12</div>
                                    </div>
                                    <div className="info">
                                        <p className="title">Ngày 2: Vòng bán kết</p>
                                        <p className="description">8:00 - 18:00 | Thi đấu vòng bán kết</p>
                                    </div>
                                </div>
                                <div className="schedule-item">
                                    <div className="date-badge date-badge--yellow">
                                        <div className="day">07</div>
                                        <div className="month">Tháng 12</div>
                                    </div>
                                    <div className="info">
                                        <p className="title">Ngày 3: Chung kết & Lễ trao giải</p>
                                        <p className="description">8:00 - 20:00 | Thi đấu chung kết và lễ trao giải</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="card">
                            <h3>Thông Tin Liên Hệ</h3>
                            <div className="contact">
                                <div className="contact-item">
                                    <p className="label">Email</p>
                                    <p className="value">contact@taekwondo-vietnam.vn</p>
                                </div>
                                <div className="contact-item">
                                    <p className="label">Điện thoại</p>
                                    <p className="value">0909 123 456</p>
                                </div>
                                <div className="contact-item">
                                    <p className="label">Website</p>
                                    <p className="value value--link">www.taekwondo-vietnam.vn</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="tournament-details__sidebar">
                        <div className="sticky">
                            <TournamentDetailsSidebar tournamentId={tournamentId!} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}