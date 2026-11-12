import React, { useEffect } from 'react';

export default function EmblemPhase({ visible, onDone }) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, [visible, onDone]);

  return (
    <div className={`phase-layer emblem-layer ${visible ? 'visible' : 'hidden'}`}>
      {visible && (
        <img src="./emblem.jpeg" alt="Grand Theft India Emblem" draggable="false" />
      )}
    </div>
  );
}

