/* Tela de GALERIA: slideshow de fotos (patrocinadores/campeonatos).
   Placeholders coloridos por enquanto — trocar por <img> quando houver fotos.
   Controles: LEFT/RIGHT = navegar · BACK = menu. */
window.App = window.App || {};

App.screens = App.screens || {};

App.screens.gallery = (function () {
  var el, fotos = [], idx = 0, autoId = null, segundosPorFoto = 6;

  function render() {
    var html = '<div class="screen gallery-screen">';
    fotos.forEach(function (f, i) {
      html += '<div class="slide' + (i === 0 ? ' active' : '') + '" ' +
                'style="background:' + f.cor + '">' +
                '<span class="tag">' + f.categoria + '</span>' +
                '<span class="caption">' + f.titulo + '</span>' +
              '</div>';
    });
    html += '</div>';
    el.innerHTML = html;
  }

  function show(i) {
    var slides = el.querySelectorAll(".slide");
    if (!slides.length) return;
    idx = (i + slides.length) % slides.length;
    for (var k = 0; k < slides.length; k++) {
      slides[k].classList.toggle("active", k === idx);
    }
  }

  function startAuto() {
    stopAuto();
    autoId = setInterval(function () { show(idx + 1); }, segundosPorFoto * 1000);
  }
  function stopAuto() {
    if (autoId) { clearInterval(autoId); autoId = null; }
  }

  return {
    onEnter: function (container) {
      el = container;
      Promise.all([App.source.getGaleria(), App.source.getConfig()])
        .then(function (res) {
          fotos = res[0];
          segundosPorFoto = (res[1] && res[1].segundosPorFoto) || 6;
          idx = 0;
          render();
          startAuto();
        });
    },
    handleInput: function (action) {
      if (action === "RIGHT") { show(idx + 1); startAuto(); }
      else if (action === "LEFT") { show(idx - 1); startAuto(); }
      else if (action === "BACK") { App.router.go("menu"); }
    },
    onExit: function () { stopAuto(); }
  };
})();
