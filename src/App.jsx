import React, { useState, useEffect, useRef, useCallback } from 'react';
import LandingScreen from './components/LandingScreen';
import EmblemPhase from './components/EmblemPhase';
import SlideshowPhase from './components/SlideshowPhase';
import MainSite from './components/MainSite';
import './App.css';

// Asset configuration — add more bg/ch pairs here as you drop files in /public
const SLIDE_PAIRS = [
  { bg: '/bg1.jpeg', ch: '/ch1.png' },
  { bg: '/bg2.jpg', ch: '/ch2.png' },
  { bg: '/bg3.jpg', ch: '/ch3.png' },
  { bg: '/bg4.jpg', ch: '/ch4.png' },
  { bg: '/bg5.jpg', ch: '/ch5.png' },
];

// Phases: landing → emblem → slideshow → main
// 'landing' | 'emblem' | 'slideshow' | 'main'

export default function App() {
  const [phase, setPhase] = useState('landing');
  const audioRef = useRef(null);

  const handleLandingClick = useCallback(() => {
    // Start audio
    if (!audioRef.current) {
      const audio = new Audio('/gta.mp3');
      audio.loop = true;
      audio.volume = 0.6;
      audio.play().catch(() => { });
      audioRef.current = audio;
    }
    setPhase('emblem');
  }, []);

  const handleEmblemDone = useCallback(() => {
    setPhase('slideshow');
  }, []);

  const handleSlideshowDone = useCallback(() => {
    setPhase('main');
  }, []);

  return (
    <div className="app-root">
      <LandingScreen
        visible={phase === 'landing'}
        onClick={handleLandingClick}
      />
      <EmblemPhase
        visible={phase === 'emblem'}
        onDone={handleEmblemDone}
      />
      <SlideshowPhase
        visible={phase === 'slideshow'}
        pairs={SLIDE_PAIRS}
        onDone={handleSlideshowDone}
      />
      <MainSite visible={phase === 'main'} />
    </div>
  );
}
