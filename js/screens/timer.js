/* Tela do CRONÔMETRO. Recebe um preset e roda a máquina de estados.
   Controles: OK = play/pausa · DOWN = reset · BACK = volta ao menu. */
window.App = window.App || {};

App.screens = App.screens || {};

App.screens.timer = (function () {
  var el, timer = null;

  function mmss(seg) {
    var m = Math.floor(seg / 60), s = seg % 60;
    return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
  }

  function phaseLabel(state) {
    if (state.phase === "PREPARE") return { txt: "PREPARE-SE", cls: "prepare" };
    if (state.phase === "FIGHT")   return { txt: "LUTA", cls: "fight" };
    if (state.phase === "REST")    return { txt: "DESCANSO", cls: "rest" };
    return { txt: "FIM", cls: "done" };
  }

  function render(preset) {
    el.innerHTML =
      '<div class="screen timer-screen">' +
        '<div class="timer-round" id="t-round"></div>' +
        '<div class="timer-phase" id="t-phase"></div>' +
        '<div class="timer-clock" id="t-clock">00:00</div>' +
        '<div class="timer-status" id="t-status">Pressione OK para iniciar</div>' +
      '</div>';
  }

  function paint(state) {
    var lab = phaseLabel(state);
    var round = document.getElementById("t-round");
    var phase = document.getElementById("t-phase");
    var clock = document.getElementById("t-clock");
    var status = document.getElementById("t-status");
    if (!clock) return;

    round.textContent = (state.phase === "DONE" || state.phase === "PREPARE")
      ? "" : ("LUTA " + state.round + " / " + state.totalRounds);
    phase.textContent = lab.txt;
    phase.className = "timer-phase " + lab.cls;
    clock.textContent = mmss(state.remaining);
    // Vermelho nos últimos 10s da luta/descanso (a preparação usa cor própria)
    var ativo = state.phase === "FIGHT" || state.phase === "REST";
    clock.className = "timer-clock" + (state.remaining <= 10 && ativo ? " danger" : "");

    // Música acompanha o estado: toca na luta, pausa fora dela, para no fim.
    if (App.music) App.music.sync(state);

    if (state.phase === "DONE") status.textContent = "Treino concluído · OK para reiniciar";
    else if (state.phase === "PREPARE" && !state.running) status.textContent = "OK: iniciar preparação · Voltar: menu";
    else if (state.running) status.textContent = "OK: pausar · ↓ reset · Voltar: menu";
    else status.textContent = "OK: iniciar · ↓ reset · Voltar: menu";
  }

  return {
    onEnter: function (container, params) {
      el = container;
      // params = { preset, faixas } vindo da tela de playlist.
      // (fallback: se vier só o preset, toca sem playlist definida)
      var preset = (params && params.preset) ? params.preset : params;
      var faixas = (params && params.faixas) ? params.faixas : [];
      render(preset);
      App.music.load(faixas);
      timer = App.createTimer(preset, {
        onTick: paint,
        onPhase: paint,
        onFinish: function () {},
        onCue: function (tipo) {
          if (App.sound[tipo]) App.sound[tipo]();
        }
      });
      paint(timer.getState());
    },
    handleInput: function (action) {
      if (action === "OK") {
        if (timer.getState().phase === "DONE") timer.reset();
        else timer.toggle();
      } else if (action === "DOWN") {
        timer.reset();
      } else if (action === "BACK") {
        App.router.go("menu");
      }
    },
    onExit: function () {
      if (timer) { timer.dispose(); timer = null; }
      if (App.music) App.music.stop();
    }
  };
})();
