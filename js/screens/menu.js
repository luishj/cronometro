/* Tela de MENU: grade de cards (presets + Galeria).
   Navegação em grade com ↑ ↓ ← → · OK = selecionar. */
window.App = window.App || {};

App.screens = App.screens || {};

App.screens.menu = (function () {
  var COLS = 2;                     // colunas da grade
  var el, presets = [], cards = [], items = [], focus = 0;

  function fmt(seg) {
    var m = Math.floor(seg / 60), s = seg % 60;
    return m > 0 ? (m + "min" + (s ? " " + s + "s" : "")) : (s + "s");
  }

  // Monta a lista lógica de cards (presets + a opção Galeria no fim).
  function buildCards() {
    cards = presets.map(function (p) {
      var linhas = [p.qtdLutas + " round(s) · " + fmt(p.tempoLutaSeg)];
      if (p.descansoSeg > 0) linhas.push(fmt(p.descansoSeg) + " descanso");
      return { icone: p.icone || "🥊", nome: p.nome, desc: linhas.join("<br>"), acao: "preset", ref: p };
    });
    cards.push({ icone: "📺", nome: "Galeria", desc: "Patrocinadores<br>e campeonatos", acao: "gallery" });
    cards.push({ icone: "🛠️", nome: "Diagnóstico", desc: "Testar teclas<br>do controle", acao: "diag" });
  }

  function render() {
    var html = '<div class="screen menu-screen">';
    html += '<div class="screen-title">CRONÔMETRO DE LUTA</div>';
    html += '<div class="menu-grid">';
    cards.forEach(function (c) {
      html += '<div class="menu-card">' +
                '<div class="card-icon">' + c.icone + '</div>' +
                '<div class="card-name">' + c.nome + '</div>' +
                '<div class="card-desc">' + c.desc + '</div>' +
              '</div>';
    });
    html += '</div></div>';
    el.innerHTML = html;
    items = el.querySelectorAll(".menu-card");
    updateFocus();
  }

  function updateFocus() {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle("focused", i === focus);
    }
  }

  function move(action) {
    var n = items.length, novo = focus;
    if (action === "RIGHT")      novo = focus + 1;
    else if (action === "LEFT")  novo = focus - 1;
    else if (action === "DOWN")  novo = focus + COLS;
    else if (action === "UP")    novo = focus - COLS;
    if (novo >= 0 && novo < n) { focus = novo; updateFocus(); }
  }

  return {
    onEnter: function (container) {
      el = container;
      App.source.getPresets().then(function (data) {
        presets = data;
        focus = 0;
        buildCards();
        render();
      });
    },
    handleInput: function (action) {
      if (action === "OK") {
        var c = cards[focus];
        if (!c) return;
        if (c.acao === "preset") App.router.go("playlist", c.ref);
        else if (c.acao === "diag") App.router.go("diag");
        else App.router.go("gallery");
      } else if (action === "BACK") {
        // No menu raiz, Voltar fecha o app (só no Tizen; no PC é no-op).
        if (App.tizen) App.tizen.sairDoApp();
      } else {
        move(action);
      }
    },
    onExit: function () {}
  };
})();
