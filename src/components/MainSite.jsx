import React from 'react';
import './MainSite.css';

export default function MainSite({ visible }) {
  return (
    <div className={`phase-layer coming-soon-wrapper ${visible ? 'visible' : 'hidden'}`}>
      <div className="cs-bg" />
      <div className="scanlines" />

      <div className="cs-content">
        <p className="cs-eyebrow">Rockstar India presents</p>

        <h1 className="cs-title">
          <span className="t-grand">Grand</span>
          <span className="t-theft">Theft</span>
          <span className="t-india">India</span>
        </h1>

        <p className="cs-coming-soon">Coming Soon</p>
      </div>
    </div>
  );
}
