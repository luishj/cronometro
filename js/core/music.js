/* Música local (MP3). Toca durante a LUTA; pausa na preparação/descanso; para no fim.
   Sincroniza com o cronômetro via App.music.sync(state) — idempotente,
   pode ser chamado a cada tick sem problema.
   Se um arquivo não existir, pula a faixa; se nenhuma tocar, desiste em silêncio. */
window.App = window.App || {};

App.music = (function () {
  var audio = null;
  var tracks = [];
  var idx = 0;
  var errorCount = 0;
  var volume = 0.7;          // volume normal
  var DUCK = 0.1;            // fração do volume nos 3 segundos finais (0.1 = 10%)

  // Embaralha uma cópia da lista (Fisher-Yates) para tocar em ordem aleatória.
  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function ensureAudio() {
    if (!audio) {
      audio = new Audio();
      audio.volume = volume;
      audio.addEventListener("ended", nextTrack);
      audio.addEventListener("error", skipOnError);
    }
    return audio;
  }

  function loadTrack(i) {
    if (!tracks.length) return;
    idx = (i + tracks.length) % tracks.length;
    ensureAudio().src = tracks[idx];
  }

  function nextTrack() {
    if (!tracks.length) return;
    loadTrack(idx + 1);
    play();
  }

  function skipOnError() {
    // Evita loop infinito se TODOS os arquivos estiverem faltando.
    errorCount++;
    if (errorCount > tracks.length) return;
    nextTrack();
  }

  function play() {
    var a = ensureAudio();
    if (!a.src) loadTrack(0);
    var p = a.play();
    if (p && p.catch) p.catch(function () {}); // ignora bloqueio de autoplay/arquivo ausente
  }

  return {
    // Carrega a playlist (lista de URLs/caminhos de .mp3) em ordem aleatória.
    load: function (list) {
      tracks = shuffle(list || []);
      idx = 0;
      errorCount = 0;
      if (tracks.length) ensureAudio().src = tracks[0];
    },

    // Sincroniza a música com o estado do cronômetro.
    // Toca continuamente na LUTA e no DESCANSO; não toca na preparação; para no fim.
    // Nos últimos 3 segundos abaixa o volume para o bipe se destacar; volta ao normal na virada.
    sync: function (state) {
      if (!tracks.length || !audio) return;
      if (state.phase === "DONE") {
        this.stop();
        return;
      }
      var ativo = state.phase === "FIGHT" || state.phase === "REST";
      var deveTocar = state.running && ativo;
      if (deveTocar) {
        if (audio.paused) play();                // continua de onde parou
      } else {
        if (!audio.paused) audio.pause();        // preparação ou cronômetro pausado
      }
      // Duck sustentado nos 3 segundos finais da luta/descanso.
      var abaixar = ativo && state.remaining <= 3 && state.remaining > 0;
      audio.volume = abaixar ? volume * DUCK : volume;
    },

    stop: function () {
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
      audio.volume = volume;
      loadTrack(0);
    },

    setVolume: function (v) {
      volume = v;
      if (audio) audio.volume = v;
    }
  };
})();
