# YouTube Ad Annihilator 🚀

A lightweight, high-frequency, self-correcting Manifest V3 Chrome Extension that instantly fast-forwards and mutes YouTube advertisements at the DOM level. 

Tired of traditional network-level blockers getting tripped up by YouTube's shifting infrastructure? This extension approaches the problem from a client-side execution angle—letting the player think the ad loaded successfully, but blowing past it in a fraction of a second.

---

## 🛠️ How It Works

Traditional ad blockers inspect and drop outgoing network requests. However, modern platforms often stream ad chunks through the same media channels as actual content, rendering network filters less effective. 

**YouTube Ad Annihilator** uses client-side DOM manipulation and playback acceleration:

1. **High-Frequency Polling:** A highly optimized background execution thread polls the YouTube player ecosystem every 100 milliseconds to stay ahead of layout rendering cycles.
2. **Multi-Layout Class Detection:** It matches signatures across both desktop (`www.youtube.com`) and mobile (`m.youtube.com`) layouts, looking for ad-specific mutations (`.ad-showing`, `.ad-interrupting`) and structural overlay elements.
3. **16x Playback Hyper-Drive:** The moment an ad is verified, the engine instantly silences the audio track (`video.muted = true`) and cranks the HTML5 playback rate to `16.0x`—the absolute hardware limit enforced by Chromium engines.
4. **Timeline Jumps & UI Clicking:** It updates the playback timeline node right to the final fraction of a second of the ad stream and dynamically fires automated mechanical `.click()` events on native skip wrappers.
5. **Instant State Recovery:** The exact millisecond the ad element falls away from the DOM tree, the engine automatically triggers a self-correction block, restoring your media playback seamlessly back to `1.0x` speed and unmuting the audio track.

---

## 📂 Project Structure

```text
yt-ad-annihilator/
├── manifest.json   # Extension metadata and permissions (Manifest V3)
├── content.js      # Core DOM polling and acceleration injection engine
└── styles.css      # Structural layout filters for sidebars and pop-up panels
