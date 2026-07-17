/* Camada de controle remoto.
   Cada marca de TV manda keyCodes diferentes para OK/Voltar.
   Aqui traduzimos o keyCode BRUTO -> AÇÃO LÓGICA.
   Ao adicionar uma nova marca, ajuste apenas o mapa KEYMAP abaixo. */
window.App = window.App || {};

App.remote = (function () {
  // Ações lógicas usadas pelo resto do app.
  var KEYMAP = {
    37: "LEFT",
    38: "UP",
    39: "RIGHT",
    40: "DOWN",
    13: "OK",       // Enter (teclado do PC e maioria das TVs)

    // Voltar — varia bastante por plataforma:
    8:     "BACK",  // Backspace (PC)
    27:    "BACK",  // Esc (PC)
    461:   "BACK",  // LG webOS
    10009: "BACK",  // Samsung Tizen
    166:   "BACK",  // alguns Android TV

    // Play/Pause dedicado do controle (quando existir)
    179:   "OK",
    415:   "OK",    // Play
    19:    "OK"     // Pause
  };

  var handler = null;

  function onKeyDown(e) {
    var action = KEYMAP[e.keyCode];
    if (!action) return;
    e.preventDefault();
    // Primeira interação destrava o áudio (política de autoplay das TVs)
    if (App.sound && App.sound.unlock) App.sound.unlock();
    if (handler) handler(action);
  }

  return {
    init: function (fn) {
      handler = fn;
      window.addEventListener("keydown", onKeyDown);
    }
  };
})();
