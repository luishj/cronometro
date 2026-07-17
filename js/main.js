/* Inicialização e roteamento entre telas. */
window.App = window.App || {};

App.router = (function () {
  var container, screens = {}, current = null;

  return {
    register: function (name, screen) { screens[name] = screen; },

    go: function (name, params) {
      if (current && current.onExit) current.onExit();
      current = screens[name];
      if (!current) { console.error("Tela não encontrada:", name); return; }
      current.onEnter(container, params);
    },

    input: function (action) {
      if (current && current.handleInput) current.handleInput(action);
    },

    init: function (el, startScreen) {
      container = el;
      this.go(startScreen);
    }
  };
})();

window.addEventListener("load", function () {
  App.router.register("menu", App.screens.menu);
  App.router.register("playlist", App.screens.playlist);
  App.router.register("timer", App.screens.timer);
  App.router.register("gallery", App.screens.gallery);
  App.router.register("diag", App.screens.diag);

  App.tizen.init();
  App.clock.init();
  App.remote.init(function (action) { App.router.input(action); });

  App.router.init(document.getElementById("app"), "menu");
});
