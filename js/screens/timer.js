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
        '<div class="timer-controls">' +
          '<button class="btn" id="t-btn-ok">Iniciar</button>' +
          '<button class="btn" id="t-btn-skip">⏭ Pular música</button>' +
          '<button class="btn" id="t-btn-reset">Reset</button>' +
          '<button class="btn" id="t-btn-back">Voltar</button>' +
        '</div>' +
      '</div>';
    // Suporte a mouse/seta do controle no navegador da TV.
    App.pointer.bindClick(document.getElementById("t-btn-ok"), acaoOk);
    App.pointer.bindClick(document.getElementById("t-btn-skip"), function () { App.music.skip(); });
    App.pointer.bindClick(document.getElementById("t-btn-reset"), function () { timer.reset(); });
    App.pointer.bindClick(document.getElementById("t-btn-back"), function () { App.router.go("menu"); });

    // Clicar em qualquer área vazia da tela (fora dos botões) alterna iniciar/pausar,
    // pra não precisar mirar o cursor no botão pequeno com o controle da TV.
    document.querySelector(".timer-screen").addEventListener("click", function (e) {
      if (dentroDeBotao(e.target)) return;   // clique num botão: deixa o botão agir
      if (App.sound && App.sound.unlock) App.sound.unlock();
      acaoOk();
    });
  }

  // Sobe na árvore procurando um <button>/.btn (compatível com navegadores de TV sem closest()).
  function dentroDeBotao(node) {
    while (node && node !== document) {
      if (node.tagName === "BUTTON" ||
          (node.className && ("" + node.className).indexOf("btn") !== -1)) return true;
      node = node.parentNode;
    }
    return false;
  }

  // Play/pausa/reinicia conforme o estado (usado pelo OK e pelo botão).
  function acaoOk() {
    if (!timer) return;
    if (timer.getState().phase === "DONE") timer.reset();
    else timer.toggle();
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
    else if (state.running) status.textContent = "Clique na tela ou OK: pausar · → pular música · ↓ reset · Voltar: menu";
    else status.textContent = "Clique na tela ou OK: iniciar · → pular música · ↓ reset · Voltar: menu";

    // Rótulo do botão principal acompanha o estado (para o modo mouse).
    var btnOk = document.getElementById("t-btn-ok");
    if (btnOk) {
      if (state.phase === "DONE") btnOk.textContent = "Reiniciar";
      else if (state.running) btnOk.textContent = "Pausar";
      else btnOk.textContent = "Iniciar";
    }
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
        acaoOk();
      } else if (action === "DOWN") {
        timer.reset();
      } else if (action === "RIGHT") {
        App.music.skip();
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
