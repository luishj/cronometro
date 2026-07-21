/* Tela de SELEÇÃO DE PLAYLIST. Aparece depois de escolher o round.
   Recebe o preset escolhido, deixa o usuário escolher a pasta/playlist de música
   e segue para o cronômetro levando preset + faixas. Navegação vertical.
   OK = confirma · BACK = volta ao menu. */
window.App = window.App || {};

App.screens = App.screens || {};

App.screens.playlist = (function () {
  var el, preset = null, playlists = [], items = [], focus = 0;

  function render() {
    var html = '<div class="screen has-back">';
    html += '<button class="btn btn-back" id="pl-back">‹ Voltar</button>';
    html += '<div class="screen-title">MÚSICA DO TREINO</div>';
    html += '<div class="screen-subtitle">' + (preset ? preset.nome : "") + '</div>';
    html += '<ul class="menu-list">';
    playlists.forEach(function (p) {
      var n = p.faixas ? p.faixas.length : 0;
      var desc = n === 0 ? "Nenhuma faixa"
                         : (n + " faixa" + (n > 1 ? "s" : ""));
      html += '<li class="menu-item">' +
                '<span class="name">' + p.nome + '</span>' +
                '<span class="desc">' + desc + '</span>' +
              '</li>';
    });
    html += '</ul></div>';
    el.innerHTML = html;
    items = el.querySelectorAll(".menu-item");
    updateFocus();
    // Suporte a mouse/seta do controle no navegador da TV.
    App.pointer.bindList(items,
      function (i) { focus = i; updateFocus(); },
      function (i) { confirmar(i); });
    App.pointer.bindClick(el.querySelector("#pl-back"),
      function () { App.router.go("menu"); });
  }

  // Confirma a playlist i e segue para o cronômetro.
  function confirmar(i) {
    var escolhida = playlists[i];
    App.router.go("timer", { preset: preset, faixas: escolhida ? escolhida.faixas : [] });
  }

  function updateFocus() {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle("focused", i === focus);
    }
  }

  return {
    onEnter: function (container, params) {
      el = container;
      preset = params;
      App.source.getPlaylists().then(function (data) {
        playlists = data || [];
        focus = 0;
        render();
      });
    },
    handleInput: function (action) {
      if (action === "DOWN") { focus = Math.min(items.length - 1, focus + 1); updateFocus(); }
      else if (action === "UP") { focus = Math.max(0, focus - 1); updateFocus(); }
      else if (action === "OK") {
        confirmar(focus);
      } else if (action === "BACK") {
        App.router.go("menu");
      }
    },
    onExit: function () {}
  };
})();
