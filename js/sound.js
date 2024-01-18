let isMuted = false;

export function playSound(source) {
  if (!isMuted) {
    let audio = new Audio(source);
    audio.play();
  }
}

export function toggleVolume() {
  if (!volumeButton.classList.contains('clicked')) {
    isMuted = true;
    volumeButton.innerText = 'unmute 🔈';

    volumeButton.classList.add('clicked');
  } else {
    isMuted = false;
    volumeButton.innerText = 'mute 🔈';
    volumeButton.classList.remove('clicked');
  }
}
