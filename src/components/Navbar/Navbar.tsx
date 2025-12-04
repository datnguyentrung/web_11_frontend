import './Navbar.scss';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
    title?: string;
}

export default function Navbar({ title = "Hệ Thống Taekwondo Văn Quán" }: NavbarProps) {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__logo">
                    <div className="navbar__logo-icon">
                        <img src="/taekwondo.jpg" alt="Taekwondo Logo" />
                    </div>
                    <span className="navbar__logo-text">Taekwondo</span>
                </div>

                <h1 className="navbar__title">
                    {title}
                </h1>

                <div className="navbar__actions">
                    <div className="navbar__nav">
                        {/* Tournament */}
                        <Link to='/giai-dau' className={`navbar__nav-item ${location.pathname === '/giai-dau' ? 'active' : ''}`}>
                            🏆 Giải đấu
                        </Link>

                        {/* Dropdown Menu for Fitness Program */}
                        <div className="dropdown-menu">
                            <Link
                                to="/chuong-trinh-ky-nang/bang-xep-hang"
                                className={`dropdown-item ${location.pathname === '/fitness-program/ranker' ? 'active' : ''}`}
                            >
                                📊 Bảng xếp hạng
                            </Link>
                            <Link
                                to="/chuong-trinh-ky-nang/bang-quy-doi-trinh-do"
                                className={`dropdown-item ${location.pathname === '/fitness-program/skill-level-reference' ? 'active' : ''}`}
                            >
                                📋 Quy đổi trình độ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    );
}