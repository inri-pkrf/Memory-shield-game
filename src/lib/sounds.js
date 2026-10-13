let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, duration, type = 'sine', volume = 0.25, delay = 0) {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const start = ctx.currentTime + delay;
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration);
}

export function playFlip() {
  playTone(500, 0.12, 'triangle', 0.2);
}

export function playMatch() {
  playTone(523, 0.12, 'sine', 0.3, 0);
  playTone(659, 0.12, 'sine', 0.3, 0.1);
  playTone(784, 0.25, 'sine', 0.3, 0.2);
}

export function playWrong() {
  playTone(220, 0.15, 'sawtooth', 0.15, 0);
  playTone(165, 0.3, 'sawtooth', 0.15, 0.12);
}