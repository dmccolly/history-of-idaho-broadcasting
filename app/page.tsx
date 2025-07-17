import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Boise Radio History</h1>
          <p className="hero-description">
            Exploring the rich history of radio broadcasting in the Treasure Valley
          </p>
          <Link href="/stations" className="hero-button">
            Explore Our Stations
          </Link>
        </div>
      </div>
      
      <section className="intro-section">
        <div className="container">
          <h2 className="section-title">Welcome to Boise Radio History</h2>
          <p className="section-text">
            This site is dedicated to preserving and sharing the rich history of radio broadcasting
            in Boise, Idaho and the surrounding Treasure Valley. From the early days of AM radio
            to today's diverse media landscape, we document the stations, personalities, and stories
            that have shaped our local airwaves.
          </p>
          <p className="section-text">
            Explore our collection of station histories, view our timeline of significant events,
            and learn about the people who brought radio to life in our community.
          </p>
        </div>
      </section>
      
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Stations</h2>
          <div className="featured-grid">
            <div className="featured-card glassmorphic">
              <div className="featured-content">
                <h3>KBOI 670 AM</h3>
                <p>One of Idaho's oldest and most influential radio stations, on air since 1927.</p>
                <Link href="/stations" className="featured-link">Learn More</Link>
              </div>
            </div>
            <div className="featured-card glassmorphic">
              <div className="featured-content">
                <h3>KRVB 94.9 FM</h3>
                <p>Known as "The River," Boise's premier Adult Album Alternative station.</p>
                <Link href="/stations" className="featured-link">Learn More</Link>
              </div>
            </div>
            <div className="featured-card glassmorphic">
              <div className="featured-content">
                <h3>KBSU 90.3 FM</h3>
                <p>Boise State Public Radio's flagship station, serving the community since 1976.</p>
                <Link href="/stations" className="featured-link">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        .hero {
          height: 60vh;
          min-height: 400px;
          background: linear-gradient(135deg, #0070f3 0%, #00c6ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          padding: 2rem;
        }
        
        .hero-content {
          max-width: 800px;
        }
        
        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .hero-description {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        
        .hero-button {
          display: inline-block;
          background: white;
          color: #0070f3;
          padding: 0.75rem 1.5rem;
          border-radius: 30px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .hero-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        
        .intro-section {
          padding: 4rem 2rem;
          background-color: white;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 2rem;
          color: #0070f3;
        }
        
        .section-text {
          max-width: 800px;
          margin: 0 auto 1.5rem;
          font-size: 1.1rem;
          line-height: 1.7;
        }
        
        .featured-section {
          padding: 4rem 2rem;
          background-color: #f5f7fa;
        }
        
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .featured-card {
          height: 100%;
          padding: 2rem;
          transition: transform 0.3s ease;
        }
        
        .featured-card:hover {
          transform: translateY(-5px);
        }
        
        .featured-content h3 {
          margin-bottom: 1rem;
          color: #0070f3;
        }
        
        .featured-content p {
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .featured-link {
          color: #0070f3;
          font-weight: 600;
          display: inline-block;
          position: relative;
        }
        
        .featured-link:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: #0070f3;
          transition: width 0.3s ease;
        }
        
        .featured-link:hover:after {
          width: 100%;
        }
        
        @media (max-width: 1024px) {
          .featured-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1.25rem;
          }
        }
        
        @media (max-width: 640px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }
          
          .hero {
            min-height: 300px;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-description {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </main>
  );
}