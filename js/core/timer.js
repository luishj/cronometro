/* Máquina de estados do cronômetro de luta.
   Fases: FIGHT -> REST -> FIGHT ... até o último round -> DONE.
   Usa timestamp (não contagem de ticks) para não acumular atraso. */
window.App = window.App || {};

App.createTimer = function (config, handlers) {
  // config: { tempoLutaSeg, qtdLutas, descansoSeg, avisoSeg?, prepararSeg? }
  // handlers: { onTick(state), onPhase(state), onCue(tipo), onFinish() }
  var avisoSeg = config.avisoSeg != null ? config.avisoSeg : 10;
  var prepararSeg = config.prepararSeg != null ? config.prepararSeg : 10;

  var state = {
    phase: "PREPARE",     // "PREPARE" | "FIGHT" | "REST" | "DONE"
    round: 1,
    totalRounds: config.qtdLutas,
    remaining: prepararSeg,
    running: false
  };

  var intervalId = null;
  var targetEnd = 0;      // timestamp (ms) do fim da fase atual
  var lastCueSec = null;  // último segundo que já emitiu bipe (evita repetir no mesmo segundo)

  function phaseDuration() {
    if (state.phase === "PREPARE") return prepararSeg;
    return state.phase === "FIGHT" ? config.tempoLutaSeg : config.descansoSeg;
  }

  function emit(name) {
    if (handlers && handlers[name]) handlers[name](state);
  }
  function cue(tipo) {
    if (handlers && handlers.onCue) handlers.onCue(tipo);
  }

  function tick() {
    var now = Date.now();
    state.remaining = Math.max(0, Math.ceil((targetEnd - now) / 1000));

    // Bipe a cada segundo nos últimos avisoSeg segundos (contagem regressiva audível)
    if (state.remaining <= avisoSeg && state.remaining > 0 && state.remaining !== lastCueSec) {
      lastCueSec = state.remaining;
      cue(state.remaining <= 3 ? "warnFinal" : "warn");
    }

    if (state.remaining <= 0) {
      nextPhase();
      return;
    }
    emit("onTick");
  }

  function nextPhase() {
    // O fim da preparação não toca o som grave de "fim de round" — só o sino da luta.
    if (state.phase !== "PREPARE") cue("end");

    if (state.phase === "PREPARE") {
      // Acabou a preparação -> começa a luta 1.
      state.phase = "FIGHT";
      state.round = 1;
      state.remaining = config.tempoLutaSeg;
    } else if (state.phase === "FIGHT") {
      // Terminou a luta. Ainda há rounds? Vai pro descanso.
      if (state.round >= state.totalRounds) {
        finish();
        return;
      }
      state.phase = "REST";
      state.remaining = config.descansoSeg;
    } else {
      // Terminou o descanso -> próxima luta.
      state.round += 1;
      state.phase = "FIGHT";
      state.remaining = config.tempoLutaSeg;
    }

    lastCueSec = null;
    targetEnd = Date.now() + state.remaining * 1000;
    cue("start");
    emit("onPhase");
    emit("onTick");
  }

  function finish() {
    stopInterval();
    state.phase = "DONE";
    state.running = false;
    state.remaining = 0;
    cue("finish");
    emit("onPhase");
    emit("onTick");
    emit("onFinish");
  }

  function startInterval() {
    stopInterval();
    intervalId = setInterval(tick, 200);
  }
  function stopInterval() {
    if (intervalId) { clearInterval(intervalId); intervalId = null; }
  }

  return {
    getState: function () { return state; },

    play: function () {
      if (state.running || state.phase === "DONE") return;
      state.running = true;
      targetEnd = Date.now() + state.remaining * 1000;
      // Toca o sino de início se estamos no começo cheio de uma fase de luta/descanso.
      // Na preparação não toca sino: só a contagem regressiva; o sino vem ao começar a luta.
      if (state.phase !== "PREPARE" && state.remaining === phaseDuration()) cue("start");
      startInterval();
      emit("onPhase");
    },

    pause: function () {
      if (!state.running) return;
      state.running = false;
      stopInterval();
      emit("onTick");
    },

    toggle: function () {
      if (state.running) this.pause(); else this.play();
    },

    reset: function () {
      stopInterval();
      state.phase = "PREPARE";
      state.round = 1;
      state.remaining = prepararSeg;
      state.running = false;
      lastCueSec = null;
      emit("onPhase");
      emit("onTick");
    },

    dispose: stopInterval
  };
};
