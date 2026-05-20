console.log("🚀 [YT Annihilator] Self-Correcting Engine Online!");

function processVideoState() {
  const video = document.querySelector('#movie_player video, .html5-main-video');
  const moviePlayer = document.querySelector('#movie_player, .html5-video-player');
  
  if (!video) return;

  // 1. Double-verification check: Is YouTube explicitly displaying an ad?
  const isAdShowing = moviePlayer && (
    moviePlayer.classList.contains('ad-showing') || 
    moviePlayer.classList.contains('ad-interrupting')
  );
  
  // Verify via undeniable ad-only UI layouts (skip buttons or ad text badges)
  const hasStrictAdUI = document.querySelector([
    '.ytp-ad-player-overlay',
    '.ytp-ad-skip-button-container',
    '.ytp-ad-skip-button-slot',
    '.ytp-ad-text',
    '.ytm-ad-overlay-container'
  ].join(','));

  // 2. STATE A: An Ad is genuinely playing
  if (isAdShowing || hasStrictAdUI) {
    // Mute immediately to hide glitchy fast audio audio
    video.muted = true;
    
    // Maximize acceleration
    if (video.playbackRate !== 16.0) {
      video.playbackRate = 16.0;
    }

    // Safely skip near the terminal boundary of the ad tracking chunk
    if (isFinite(video.duration) && video.currentTime < (video.duration - 0.2)) {
      video.currentTime = video.duration - 0.1;
    }

    // Mechanically press any variant of skip buttons
    const skipButtons = document.querySelectorAll([
      '.ytp-ad-skip-button',
      '.ytp-ad-skip-button-modern',
      '.ytp-skip-ad-button',
      '.ytm-ad-skip-button'
    ].join(','));

    skipButtons.forEach(btn => {
      if (btn) btn.click();
    });

  } 
  // 3. STATE B: No ad is playing. SELF-CORRECT IMMEDIATELY!
  else {
    // If the engine left the video running fast, drop it back to normal instantly
    if (video.playbackRate === 16.0) {
      video.playbackRate = 1.0;
      video.muted = false; // Restore your audio cleanly
      console.log("▶️ [YT Annihilator] Ad passed cleanly. Playback normal at 1x.");
    }
  }
}

// Check every 100ms. Fast enough to beat the UI rendering engine, light enough for the CPU.
setInterval(processVideoState, 100);