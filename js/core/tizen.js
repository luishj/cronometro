/* Integração com as APIs do Tizen (TV). TUDO é opcional e defensivo:
   no PC (sem o objeto global "tizen") cada função vira no-op, então o app
   continua rodando igual no navegador para desenvolvimento. */
window.App = window.App || {};

App.tizen = (function () {
  var temTizen = (typeof tizen !== "undefined");

  // Impede a TV de escurecer/entrar em descanso durante o uso.
  function manterTelaAcesa() {
    try {
      if (temTizen && tizen.power) {
        tizen.power.request("SCREEN", "SCREEN_NORMAL");
      }
    } catch (e) {}
  }

  // Setas, OK e Voltar já funcionam por padrão no Tizen.
  // Registramos teclas de mídia/coloridas para uso futuro (ignora se faltar).
  function registrarTeclas() {
    try {
      if (temTizen && tizen.tvinputdevice) {
        ["MediaPlayPause", "MediaPlay", "MediaPause", "MediaStop"].forEach(function (k) {
          try { tizen.tvinputdevice.registerKey(k); } catch (e) {}
        });
      }
    } catch (e) {}
  }

  return {
    disponivel: temTizen,

    init: function () {
      manterTelaAcesa();
      registrarTeclas();
    },

    // Fecha o app (usado no botão Voltar do menu raiz). No PC não faz nada.
    sairDoApp: function () {
      try {
        if (temTizen && tizen.application) {
          tizen.application.getCurrentApplication().exit();
        }
      } catch (e) {}
    }
  };
})();
