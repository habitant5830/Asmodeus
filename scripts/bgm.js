window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgm");
  audio.volume = 0.6; // Set volume (0.0 to 1.0)

  // 1. Restore the audio timestamp from before the refresh
  const savedTime = localStorage.getItem("bgm_currentTime");
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }

  // 2. Continuously save the current playback time every second
  setInterval(() => {
    if (!audio.paused) {
      localStorage.setItem("bgm_currentTime", audio.currentTime);
    }
  }, 1000);

  // 3. Function to attempt playing the audio
  const startAudio = () => {
    audio.play().catch((error) => {
      console.log("Playback prevented by browser policy:", error);
    });
  };

  // Try playing right away (works if the browser session already allowed it)
  startAudio();

  // Fallback: If blocked on a fresh session, play on the first click/keypress
  const unlockAudio = () => {
    startAudio();
    document.removeEventListener("click", unlockAudio);
    document.removeEventListener("keydown", unlockAudio);
  };

  document.addEventListener("click", unlockAudio);
  document.addEventListener("keydown", unlockAudio);
});
