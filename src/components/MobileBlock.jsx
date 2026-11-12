import React from 'react';
import './MobileBlock.css';

export default function MobileBlock() {
  return (
    <div className="mobile-block">
      <div className="mb-content">
        <div className="mb-icon">🎮</div>
        <h1 className="mb-title">
          <span>Grand</span>
          <span>Theft</span>
          <span>India</span>
        </h1>
        <p className="mb-msg">This experience is designed for<br />desktop &amp; laptop only.</p>
        <p className="mb-sub">Please open it on a laptop or desktop browser.</p>
      </div>
    </div>
  );
}

