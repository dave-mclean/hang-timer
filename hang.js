// Beeps
function beep_sound(freq = 440, duration = 0.1, volume = 0.2) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    // Quick volume decay to prevent click sound
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
};

const go_beep = beep_sound.bind(null, 670, 0.5, 0.5)
const ready_beep = beep_sound.bind(null, 500, 0.5, 0.5)
const stop_beep = beep_sound.bind(null, 330, 0.5, 0.5)


/**
 * Formats the total seconds into MM:SS if it's more than 1 minute
**/
function formatTime(seconds) {
    if (seconds === '--') {
        return '--:--'
    } else if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    } else {
        return String(seconds).padStart(2, '0');
    }
}

function toggleSettings() {
    settingsToggle.classList.toggle("expanded")
    settingsContent.classList.toggle('expanded')
}