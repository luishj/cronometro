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
    // Suporte a mouse/seta do controle no navegador da TV.
    App.pointer.bindList(items,
      function (i) { focus = i; updateFocus(); },
      function (i) { selecionar(i); });
  }

  // Confirma o card i (usado pelo OK do controle e pelo clique do mouse).
  function selecionar(i) {
    var c = cards[i];
    if (!c) return;
    if (c.acao === "preset") App.router.go("playlist", c.ref);
    else App.router.go("gallery");
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
        selecionar(focus);
      } else if (action === "BACK") {
        // Menu raiz: não há para onde voltar (no navegador da TV não fecha a aba).
      } else {
        move(action);
      }
    },
    onExit: function () {}
  };
})();
