// Array de playlist simulada
const playlist = [
  {
    title: 'Musica Boa',
    artist: 'SESI Beats',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    title: 'Beat Urbano',
    artist: 'SESI Beats',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    title: 'Lofi Vibes',
    artist: 'SESI Beats',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];

// Estado da aplicação
let currentTrackIndex = 0;
let isPlaying = false;

// Elementos do DOM
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const statusBadge = document.getElementById('status-badge');

const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const albumCover = document.getElementById('album-cover');

const progressBar = document.getElementById('progress-bar');
const progressWrapper = document.getElementById('progress-wrapper');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');

// Carregar informações da música atual
function loadTrack(index) {
  const track = playlist[index];
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  albumCover.src = track.cover;
  audioPlayer.src = track.src;
}

// Formatar tempo (segundos -> M:SS)
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Alternar entre Play e Pause
function togglePlay() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function playTrack() {
  isPlaying = true;
  audioPlayer.play();
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'block';
  statusBadge.textContent = 'Tocando';
  statusBadge.style.backgroundColor = 'rgba(123, 97, 255, 0.85)';
}

function pauseTrack() {
  isPlaying = false;
  audioPlayer.pause();
  playIcon.style.display = 'block';
  pauseIcon.style.display = 'none';
  statusBadge.textContent = 'Pausado';
  statusBadge.style.backgroundColor = 'rgba(55, 60, 72, 0.85)';
}

// Avançar música
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) playTrack();
}

// Retroceder música
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) playTrack();
}

// Atualizar a barra de progresso e o tempo decorrido
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
    durationTimeEl.textContent = formatTime(duration);
  }
}

// Mudar o ponto da música ao clicar na barra de progresso
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;
  if (duration) {
    audioPlayer.currentTime = (clickX / width) * duration;
  }
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', nextTrack);
progressWrapper.addEventListener('click', setProgress);

// Inicializar primeiro item
loadTrack(currentTrackIndex);