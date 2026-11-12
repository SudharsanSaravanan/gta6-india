import React, { useState, useEffect, useRef, useCallback } from 'react';

const SLIDE_DURATION = 3800; // ms each slide is fully visible
const FADE_DURATION  = 700;  // ms crossfade between slides

export default function SlideshowPhase({ visible, pairs, onDone }) {
  const [internalState, setInternalState] = useState('idle');
  const [currentIdx, setCurrentIdx]       = useState(0);
  const [nextIdx, setNextIdx]             = useState(null);
  const timerRef  = useRef(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  // Start / reset when phase becomes visible
  useEffect(() => {
    if (visible && internalState === 'idle') {
      setCurrentIdx(0);
      setNextIdx(null);
      setInternalState('running');
    }
    if (!visible) {
      clearTimer();
      setInternalState('idle');
      setCurrentIdx(0);
      setNextIdx(null);
    }
  }, [visible]); // eslint-disable-line

  // Drive the slide sequence
  useEffect(() => {
    if (internalState !== 'running') return;

    timerRef.current = setTimeout(() => {
      const isLast = currentIdx >= pairs.length - 1;
      if (isLast) {
        setInternalState('fading-out');
        setTimeout(() => onDoneRef.current(), FADE_DURATION + 50);
      } else {
        const next = currentIdx + 1;
        setNextIdx(next);
        // After crossfade completes, promote next → current (old slot stays mounted until then)
        setTimeout(() => {
          setCurrentIdx(next);
          setNextIdx(null);
        }, FADE_DURATION);
      }
    }, SLIDE_DURATION);

    return clearTimer;
  }, [internalState, currentIdx, pairs.length, clearTimer]);

  const shouldMount = internalState !== 'idle';
  const isVisible   = internalState === 'running';

  if (!shouldMount) return null;

  return (
    <div
      className={`phase-layer slideshow-layer ${isVisible ? 'visible' : 'hidden'}`}
      style={{ transition: `opacity ${FADE_DURATION}ms ease-in-out` }}
    >
      {/*
        Keep ALL rendered slides in the DOM during transition.
        currentIdx  → always visible (z-index 1)
        nextIdx     → fades in on top (z-index 2), starts opacity 1 immediately
                      because it's layered OVER the current — no black gap.
      */}
      <SlideSlot pair={pairs[currentIdx]} zIndex={1} startOpacity={1} key={`s-${currentIdx}`} />
      {nextIdx !== null && (
        <SlideSlot pair={pairs[nextIdx]} zIndex={2} startOpacity={0} key={`s-${nextIdx}`} />
      )}
    </div>
  );
}

function SlideSlot({ pair, zIndex, startOpacity }) {
  const [opacity, setOpacity] = useState(startOpacity);

  useEffect(() => {
    if (startOpacity === 0) {
      // Double-rAF: paint at 0 first, then transition to 1
      const r1 = requestAnimationFrame(() => {
        const r2 = requestAnimationFrame(() => setOpacity(1));
        return () => cancelAnimationFrame(r2);
      });
      return () => cancelAnimationFrame(r1);
    }
  }, []); // eslint-disable-line

  return (
    <div
      className="slide-slot"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex,
        opacity,
        transition: `opacity ${FADE_DURATION}ms ease-in-out`,
      }}
    >
      <img className="slide-bg" src={pair.bg} alt="" draggable="false" />
      <img className="slide-ch" src={pair.ch} alt="" draggable="false" />
    </div>
  );
}
