console.log("🚀 [YT Annihilator] Enhanced Self-Correcting Engine Online!");

// Keep track of the user's preferred speed across ad intervals
let userPreferredSpeed = 1.0;

function processVideoState() {
  const video = document.querySelector('#movie_player video, .html5-main-video');
  const moviePlayer = document.querySelector('#movie_player, .html5-video-player');
  
  if (!video) return;

  // 1. Verification checks: Is an ad playing?
  const isAdShowing = moviePlayer && (
    moviePlayer.classList.contains('ad-showing') || 
    moviePlayer.classList.contains('ad-interrupting')
  );
  
  const hasStrictAdUI = document.querySelector([
    '.ytp-ad-player-overlay',
    '.ytp-ad-skip-button-container',
    '.ytp-ad-skip-button-slot',
    '.ytp-ad-text',
    '.ytm-ad-overlay-container',
    '[class*="ad-showing"]',
    '[class*="ad-interrupting"]'
  ].join(','));

  // 2. STATE A: An Ad is genuinely playing
  if (isAdShowing || hasStrictAdUI) {
    // Save the user's custom speed right before we accelerate (only if it isn't already the ad-speed)
    if (video.playbackRate !== 16.0) {
      userPreferredSpeed = video.playbackRate;
    }

    // Mute immediately to hide glitchy audio
    video.muted = true;
    
    // Completely hide the glitchy 16x frame flash visually
    if (video.style.opacity !== "0") {
      video.style.opacity = "0";
    }
    
    // Maximize acceleration
    if (video.playbackRate !== 16.0) {
      video.playbackRate = 16.0;
    }

    // Safely skip near the terminal boundary of the ad tracking chunk
    if (isFinite(video.duration) && video.currentTime < (video.duration - 0.1)) {
      video.currentTime = video.duration - 0.05;
    }

    // Target by layout selectors
    const skipButtons = document.querySelectorAll([
      '.ytp-ad-skip-button',
      '.ytp-ad-skip-button-modern',
      '.ytp-skip-ad-button',
      '.ytm-ad-skip-button',
      '.ytp-ad-skip-button-slot'
    ].join(','));

    skipButtons.forEach(btn => {
      if (btn) btn.click();
    });

    // Fallback: Fuzzy Text matching if classes change (find buttons with 'Skip')
    const allButtons = document.querySelectorAll('button, .ytp-ad-text, [role="button"]');
    allButtons.forEach(btn => {
      if (btn && btn.textContent && /skip/i.test(btn.textContent)) {
        btn.click();
      }
    });

  } 
  // 3. STATE B: No ad is playing. SELF-CORRECT IMMEDIATELY!
  else {
    // Cache current speed to check if a user updates their speed *during* normal playback
    if (video.playbackRate !== 16.0) {
      userPreferredSpeed = video.playbackRate;
    }

    // Restore custom settings cleanly when the ad goes away
    if (video.playbackRate === 16.0 || video.style.opacity === "0") {
      video.playbackRate = userPreferredSpeed; //  Restores your 1.5x (or any custom speed)
      video.style.opacity = "1";
      video.muted = false; 
      console.log(`▶️ [YT Annihilator] Ad passed cleanly. Playback restored to ${userPreferredSpeed}x.`);
    }
  }
}

// High frequency pooling loop to back up the layout changes
setInterval(processVideoState, 100);

// Use MutationObserver to monitor dynamic SPA structural swaps and keep the script alive
const observer = new MutationObserver(() => {
  processVideoState();
});

// Start tracking layout shifts once the document tree initializes
if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
}