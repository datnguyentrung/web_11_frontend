import './TournamentDetailsSidebar.scss';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Swords, Users, ChevronRight } from 'lucide-react';

interface TournamentDetailsSidebarProps {
    tournamentId: string;
}

export default function TournamentDetailsSidebar({ tournamentId }: TournamentDetailsSidebarProps) {
    console.log('TournamentDetailsSidebar rendered');
    const location = useLocation();

    const menuItems = [
        {
            to: `/giai-dau/${tournamentId}/quyen`,
            icon: Shield,
            label: 'Danh Sách Quyền',
            description: 'Xem kết quả thi đấu quyền'
        },
        {
            to: `/giai-dau/${tournamentId}/doi-khang`,
            icon: Swords,
            label: 'Danh Sách Đối Kháng',
            description: 'Xem kết quả thi đấu đối kháng'
        },
        {
            to: `/giai-dau/${tournamentId}/van-dong-vien`,
            icon: Users,
            label: 'Danh Sách Vận Động Viên',
            description: 'Xem thông tin vận động viên'
        }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="tournament-details-sidebar">
            <div className="tournament-details-sidebar__header">
                <h2>
                    <Shield className="icon" />
                    Danh Mục Thi Đấu
                </h2>
            </div>

            <div className="tournament-details-sidebar__menu">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.to);

                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`tournament-details-sidebar__menu-item ${active ? 'tournament-details-sidebar__menu-item--active' : ''
                                }`}
                        >
                            <div className="content">
                                <div className="main">
                                    <div className={`icon-container ${active ? 'icon-container--active' : 'icon-container--inactive'
                                        }`}>
                                        <Icon className="icon" />
                                    </div>
                                    <div className="text">
                                        <p className={`label ${active ? 'label--active' : 'label--inactive'
                                            }`}>
                                            {item.label}
                                        </p>
                                        <p className="description">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight className={`chevron ${active ? 'chevron--active' : 'chevron--inactive'
                                    }`} />
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="tournament-details-sidebar__downloads">
                <p className="title">
                    Tải xuống tài liệu
                </p>
                <div className="list">
                    <button className="download-item">
                        📄 Thể lệ giải đấu (PDF)
                    </button>
                    <button className="download-item">
                        📊 Lịch thi đấu chi tiết (PDF)
                    </button>
                </div>
            </div>
        </div>
    );
}