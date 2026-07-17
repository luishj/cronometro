/* Tela de DIAGNÓSTICO DE CONTROLE.
   Mostra o keyCode BRUTO de cada botão apertado + a ação lógica que o
   remote.js mapeia hoje (ou "não mapeada"). Serve para descobrir os códigos
   do controle da TV Hyundai/Tizen e adicioná-los ao KEYMAP em remote.js.
   Pode ser removida depois da configuração.

   Escuta o teclado DIRETO (não passa pelo remote.js) para enxergar TODAS as
   teclas, inclusive as que ainda não estão mapeadas. */
window.App = window.App || {};
App.screens = App.screens || {};

App.screens.diag = (function () {
  var el, ultimos = [], listener = null;

  // Espelho do KEYMAP do remote.js, só para exibir o nome da ação.
  var NOMES = {
    37: "LEFT", 38: "UP", 39: "RIGHT", 40: "DOWN", 13: "OK",
    8: "BACK", 27: "BACK", 461: "BACK", 10009: "BACK", 166: "BACK",
    179: "OK", 415: "OK", 19: "OK"
  };

  // Códigos que fecham a tela de diagnóstico (voltam ao menu).
  var SAIDA = { 8: 1, 27: 1, 461: 1, 10009: 1, 166: 1 };

  function render() {
    el.innerHTML =
      '<div class="screen diag-screen">' +
        '<div class="screen-title">DIAGNÓSTICO DE CONTROLE</div>' +
        '<div class="diag-hint">Aperte os botões do controle e anote os códigos.<br>' +
          'O botão <b>Voltar</b> (ou Esc) sai desta tela.</div>' +
        '<div class="diag-last" id="diag-last">Aguardando tecla…</div>' +
        '<ul class="diag-log" id="diag-log"></ul>' +
      '</div>';
  }

  function onKey(e) {
    e.preventDefault();
    var code = e.keyCode;
    var nome = NOMES[code] || "não mapeada";

    var last = document.getElementById("diag-last");
    if (last) last.textContent = "keyCode " + code + "  ·  " + nome;

    ultimos.unshift({ code: code, nome: nome });
    if (ultimos.length > 8) ultimos.pop();
    var log = document.getElementById("diag-log");
    if (log) {
      log.innerHTML = ultimos.map(function (u) {
        var cls = u.nome === "não mapeada" ? "n novo" : "n";
        return '<li><span class="c">' + u.code + '</span>' +
               '<span class="' + cls + '">' + u.nome + '</span></li>';
      }).join("");
    }

    // Sai da tela quando é um "Voltar" já conhecido.
    if (SAIDA[code]) { App.router.go("menu"); }
  }

  return {
    onEnter: function (container) {
      el = container;
      ultimos = [];
      render();
      listener = onKey;
      window.addEventListener("keydown", listener);
    },
    // Sem handleInput: esta tela usa o próprio listener de teclado bruto.
    onExit: function () {
      if (listener) window.removeEventListener("keydown", listener);
      listener = null;
    }
  };
})();
