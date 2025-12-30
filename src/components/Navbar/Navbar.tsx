import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

interface NavbarProps {
  title?: string;
}

export default function Navbar({
  title = "Hệ Thống Taekwondo Văn Quán",
}: NavbarProps) {
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

        <h1 className="navbar__title">{title}</h1>

        <div className="navbar__actions">
          <div className="navbar__nav">
            <Link
              to="/giai-dau"
              className={`navbar__nav-item ${
                location.pathname === "/giai-dau" ? "active" : ""
              }`}
            >
              🏆 Giải đấu
            </Link>

            <div className="navbar__nav-dropdown">
              <div
                className={`navbar__nav-item ${
                  location.pathname.includes("/chuong-trinh-ky-nang")
                    ? "active"
                    : ""
                }`}
              >
                💪 Kỹ năng
              </div>
              <div className="dropdown-menu">
                <Link
                  to="/chuong-trinh-ky-nang/bang-xep-hang"
                  className={`dropdown-item ${
                    location.pathname === "/chuong-trinh-ky-nang/bang-xep-hang"
                      ? "active"
                      : ""
                  }`}
                >
                  📊 Bảng xếp hạng
                </Link>
                <Link
                  to="/chuong-trinh-ky-nang/bang-quy-doi-trinh-do"
                  className={`dropdown-item ${
                    location.pathname ===
                    "/chuong-trinh-ky-nang/bang-quy-doi-trinh-do"
                      ? "active"
                      : ""
                  }`}
                >
                  📋 Quy đổi trình độ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
