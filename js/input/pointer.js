/* Camada de PONTEIRO (mouse / seta do controle no navegador da TV).
   No navegador da TV o controle vira um mouse: aparece uma seta na tela, as
   setas movem o cursor e o OK vira um clique. O resto do app é todo baseado em
   teclado (D-pad), então aqui traduzimos hover/clique para o MESMO modelo de
   foco+seleção das telas.

   Uso nas telas:
   - bindList(items, onFocus, onSelect): passar o mouse foca; clicar foca e confirma.
   - bindClick(el, fn): liga um botão/elemento único a uma ação (Voltar, play/pausa...). */
window.App = window.App || {};

App.pointer = (function () {
  // Primeira interação destrava o áudio (mesma política de autoplay do remote.js)
  function unlock() {
    if (App.sound && App.sound.unlock) App.sound.unlock();
  }

  // Liga uma lista de elementos ao foco+seleção da tela.
  // onFocus(i): move o foco visual. onSelect(i): confirma (equivale ao OK).
  function bindList(items, onFocus, onSelect) {
    for (var i = 0; i < items.length; i++) {
      (function (idx, node) {
        node.addEventListener("mouseenter", function () {
          if (onFocus) onFocus(idx);
        });
        node.addEventListener("click", function () {
          unlock();
          if (onFocus) onFocus(idx);
          if (onSelect) onSelect(idx);
        });
      })(i, items[i]);
    }
  }

  // Liga um único elemento (botão) a uma ação.
  function bindClick(node, fn) {
    if (!node) return;
    node.addEventListener("click", function () {
      unlock();
      if (fn) fn();
    });
  }

  return { bindList: bindList, bindClick: bindClick };
})();
