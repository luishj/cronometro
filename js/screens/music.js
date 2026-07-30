/* Tela MÚSICA (player standalone, sem cronômetro).
   Dois passos: (1) escolher a playlist; (2) tocar com controles.
   Passo 1 (seleção): ↑ ↓ navegar · OK escolher · BACK menu.
   Passo 2 (player):  ← anterior · → próxima · OK pausar/iniciar · BACK volta à seleção. */
window.App = window.App || {};

App.screens = App.screens || {};

App.screens.music = (function () {
  var el, view = "select", playlists = [], atual = null, items = [], focus = 0;

  // ---------- Passo 1: seleção de playlist ----------
  function renderSelect() {
    var html = '<div class="screen has-back">';
    html += '<button class="btn btn-back" id="mu-back">‹ Voltar</button>';
    html += '<div class="screen-title">MÚSICA</div>';
    html += '<div class="screen-subtitle">Escolha a playlist</div>';
    html += '<ul class="menu-list">';
    playlists.forEach(function (p) {
      var n = p.faixas ? p.faixas.length : 0;
      html += '<li class="menu-item">' +
                '<span class="name">' + p.nome + '</span>' +
                '<span class="desc">' + n + ' faixa' + (n === 1 ? "" : "s") + '</span>' +
              '</li>';
    });
    html += '</ul></div>';
    el.innerHTML = html;
    items = el.querySelectorAll(".menu-item");
    updateFocus();
    App.pointer.bindList(items,
      function (i) { focus = i; updateFocus(); },
      function (i) { escolher(i); });
    App.pointer.bindClick(el.querySelector("#mu-back"),
      function () { App.router.go("menu"); });
  }

  function updateFocus() {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle("focused", i === focus);
    }
  }

  // Escolhe a playlist i, carrega e já começa a tocar.
  function escolher(i) {
    atual = playlists[i];
    if (!atual) return;
    App.music.load(atual.faixas);
    App.music.setOnChange(pintarPlayer);   // atualiza a tela quando a faixa/estado muda
    view = "player";
    renderPlayer();
    App.music.play();                      // toca a 1ª faixa (a lista já vem embaralhada)
  }

  // ---------- Passo 2: player ----------
  function renderPlayer() {
    var html = '<div class="screen has-back music-player">';
    html += '<button class="btn btn-back" id="mu-back">‹ Voltar</button>';
    html += '<div class="screen-title">' + (atual ? atual.nome : "MÚSICA") + '</div>';
    html += '<div class="music-now" id="mu-now">—</div>';
    html += '<div class="timer-controls">';
    html +=   '<button class="btn" id="mu-prev">⏮ Voltar música</button>';
    html +=   '<button class="btn" id="mu-toggle">⏸ Pausar</button>';
    html +=   '<button class="btn" id="mu-next">⏭ Pular música</button>';
    html += '</div>';
    html += '<div class="screen-subtitle music-hint">← anterior · → próxima · OK pausar/iniciar · Voltar: playlists</div>';
    html += '</div>';
    el.innerHTML = html;
    App.pointer.bindClick(el.querySelector("#mu-back"), voltarParaSelecao);
    App.pointer.bindClick(el.querySelector("#mu-prev"), function () { App.music.prev(); });
    App.pointer.bindClick(el.querySelector("#mu-toggle"), function () { App.music.toggle(); });
    App.pointer.bindClick(el.querySelector("#mu-next"), function () { App.music.next(); });
    pintarPlayer();
  }

  // Reflete faixa atual e estado no player (chamado pelo callback do music.js).
  function pintarPlayer() {
    var now = document.getElementById("mu-now");
    if (!now) return;   // não estamos mais na tela do player
    var nome = App.music.currentName();
    var tocando = App.music.isPlaying();
    now.textContent = nome ? ((tocando ? "▶ " : "⏸ ") + nome) : "—";
    var t = document.getElementById("mu-toggle");
    if (t) t.textContent = tocando ? "⏸ Pausar" : "▶ Iniciar";
  }

  // Volta do player para a lista de playlists (para a música).
  function voltarParaSelecao() {
    App.music.setOnChange(null);
    App.music.stop();
    view = "select";
    focus = 0;
    renderSelect();
  }

  return {
    onEnter: function (container) {
      el = container;
      view = "select";
      atual = null;
      focus = 0;
      App.source.getPlaylists().then(function (data) {
        // Só playlists com faixas (deixa "Sem música" de fora): Geral, Rock, Hip-hop, Kids.
        playlists = (data || []).filter(function (p) { return p.faixas && p.faixas.length; });
        renderSelect();
      });
    },
    handleInput: function (action) {
      if (view === "select") {
        if (action === "DOWN")      { focus = Math.min(items.length - 1, focus + 1); updateFocus(); }
        else if (action === "UP")   { focus = Math.max(0, focus - 1); updateFocus(); }
        else if (action === "OK")   { escolher(focus); }
        else if (action === "BACK") { App.router.go("menu"); }
      } else {
        if (action === "OK")        { App.music.toggle(); }
        else if (action === "LEFT") { App.music.prev(); }
        else if (action === "RIGHT"){ App.music.next(); }
        else if (action === "BACK") { voltarParaSelecao(); }
      }
    },
    onExit: function () {
      App.music.setOnChange(null);
      App.music.stop();
    }
  };
})();
