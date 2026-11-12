import React from 'react';

export default function LandingScreen({ visible, onClick }) {
  return (
    <div
      className={`phase-layer landing-layer ${visible ? 'visible' : 'hidden'}`}
      onClick={visible ? onClick : undefined}
    >
      <img src="/gta.jpg" alt="Grand Theft India" draggable="false" />
      {visible && (
        <div className="click-hint">Click anywhere to enter</div>
      )}
    </div>
  );
}

