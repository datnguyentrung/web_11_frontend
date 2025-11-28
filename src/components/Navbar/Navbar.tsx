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
                        <img src="/public/taekwondo.jpg" alt="Taekwondo Logo" />
                    </div>
                    <span className="navbar__logo-text">Taekwondo</span>
                </div>

                <h1 className="navbar__title">
                    {title}
                </h1>

                <div className="navbar__actions">
                    <div className="navbar__nav">
                        <Link
                            to="/"
                            className={`navbar__nav-link ${location.pathname === '/' ? 'navbar__nav-link--active' : ''}`}
                        >
                            <span>📊</span> Bảng xếp hạng
                        </Link>
                        <Link
                            to="/skill-level-reference"
                            className={`navbar__nav-link ${location.pathname === '/skill-level-reference' ? 'navbar__nav-link--active' : ''}`}
                        >
                            <span>📋</span> Quy đổi trình độ
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}