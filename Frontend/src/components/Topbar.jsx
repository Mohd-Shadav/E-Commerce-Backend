import React, { useState } from "react";

const TopBar = () => {
  const [dark, setDark] = useState(false);

  return (
    <header className={`topbar${dark ? " dark" : ""}`}>
      <div className="topbar__logo">ShopAdmin</div>
      <div className="topbar__actions">
        <button className="topbar__icon" aria-label="Notifications">
          {/* Bell Icon (SVG) */}
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"/>
          </svg>
        </button>
        <div className="topbar__profile">
          {/* Profile image or name */}
          <img
            src="https://i.pravatar.cc/32?img=3"
            alt="Admin"
            className="topbar__avatar"
          />
          <span className="topbar__name">Admin</span>
        </div>
        <button
          className="topbar__icon"
          aria-label="Toggle theme"
          onClick={() => setDark((d) => !d)}
        >
          {/* Theme Toggle Icon (Sun/Moon) */}
          {dark ? (
            // Sun icon
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          ) : (
            // Moon icon
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
            </svg>
          )}
        </button>
      </div>
      <style>{`
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 3rem;
          background: #fff;
          border-radius: 0.75rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: background 0.2s;
        }
        .topbar.dark {
          background: #23272f;
          color: #f3f3f3;
        }
        .topbar__logo {
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: 0.02em;
        }
        .topbar__actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .topbar__icon {
          background: none;
          border: none;
          padding: 0.4rem;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: background 0.15s;
          color: inherit;
        }
        .topbar__icon:hover {
          background: rgba(0,0,0,0.06);
        }
        .topbar.dark .topbar__icon:hover {
          background: rgba(255,255,255,0.08);
        }
        .topbar__profile {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.75rem;
          border-radius: 1.5rem;
          background: rgba(0,0,0,0.03);
          transition: background 0.15s;
        }
        .topbar__profile:hover {
          background: rgba(0,0,0,0.08);
        }
        .topbar.dark .topbar__profile {
          background: rgba(255,255,255,0.03);
        }
        .topbar.dark .topbar__profile:hover {
          background: rgba(255,255,255,0.08);
        }
        .topbar__avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
        .topbar__name {
          font-size: 1rem;
          font-weight: 500;
        }
        @media (max-width: 600px) {
          .topbar {
            padding: 0.5rem 0.75rem;
          }
          .topbar__logo {
            font-size: 1rem;
          }
          .topbar__profile .topbar__name {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default TopBar;