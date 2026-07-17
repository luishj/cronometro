/* Relógio de parede (hora atual). Lê o relógio do sistema da TV via new Date().
   Não precisa de internet no app nem de configuração: se a TV estiver com a hora
   certa (fuso/data-hora automática), aparece certo sozinho.
   Atualiza a cada segundo, mas só toca o DOM quando o minuto muda. */
window.App = window.App || {};

App.clock = (function () {
  var el, timer = null, ultimo = "";

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function tick() {
    if (!el) return;
    var d = new Date();
    var txt = pad(d.getHours()) + ":" + pad(d.getMinutes());
    if (txt !== ultimo) {           // evita repintar o DOM 1x/segundo à toa
      el.textContent = txt;
      ultimo = txt;
    }
  }

  return {
    init: function () {
      el = document.getElementById("clock");
      if (!el) return;
      tick();
      timer = setInterval(tick, 1000);
    }
  };
})();
