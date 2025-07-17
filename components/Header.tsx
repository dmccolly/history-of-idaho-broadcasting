import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <Link href="/">
            <span className="logo-text">Boise Radio History</span>
          </Link>
        </div>
        <nav className="main-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/stations" className="nav-link">
                Stations
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <style jsx>{`
        .site-header {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
        }
        
        .logo-text {
          color: #0070f3;
          cursor: pointer;
        }
        
        .main-nav {
          display: flex;
        }
        
        .nav-list {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 1.5rem;
        }
        
        .nav-link {
          color: #333;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 0;
          transition: color 0.2s ease;
          position: relative;
        }
        
        .nav-link:hover {
          color: #0070f3;
        }
        
        .nav-link:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #0070f3;
          transition: width 0.3s ease;
        }
        
        .nav-link:hover:after {
          width: 100%;
        }
        
        @media (max-width: 768px) {
          .header-container {
            flex-direction: column;
            padding: 1rem;
          }
          
          .logo {
            margin-bottom: 1rem;
          }
          
          .nav-list {
            gap: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .nav-list {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;