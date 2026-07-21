/* Som gerado por código (Web Audio) — sem precisar de arquivos de áudio.
   TVs bloqueiam áudio até a 1ª interação: remote.js chama unlock() no 1º clique. */
window.App = window.App || {};

App.sound = (function () {
  var ctx = null;

  function ensure() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ctx = new AC();
    }
    return ctx;
  }

  function beep(freq, durMs, type, peak) {
    var c = ensure();
    if (!c) return;
    var osc = c.createOscillator();
    var gain = c.createGain();
    osc.type = type || "square";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.001, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(peak || 0.4, c.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + durMs / 1000);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + durMs / 1000);
  }

  return {
    unlock: function () {
      var c = ensure();
      if (c && c.state === "suspended") c.resume();
    },
    // Sinais do cronômetro:
    start: function () { beep(880, 500, "square"); },              // início do round (sino)
    warn:  function () { beep(600, 120, "sine"); },                // bipe 10s..4s restantes
    warnFinal: function () { beep(1000, 220, "square", 1.0); },    // bipe dos segundos finais (mais agudo e alto)
    end:   function () { beep(440, 700, "square", 1.0); },         // fim do round (volume máximo)
    finish: function () { beep(880, 250); setTimeout(function(){ beep(660, 600); }, 300); }
  };
})();
