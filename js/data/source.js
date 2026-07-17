/* ÚNICO ponto que sabe de onde vêm os dados.
   Hoje: retorna o mock. Amanhã: troca o corpo por fetch() na API.
   Todos os métodos devolvem Promise para já ficar pronto pro async da API. */
window.App = window.App || {};

App.source = {
  getPresets: function () {
    // Futuro: return fetch(API + "/presets").then(r => r.json());
    return Promise.resolve(App.mock.presets);
  },

  getGaleria: function () {
    // Futuro: return fetch(API + "/galeria").then(r => r.json());
    return Promise.resolve(App.mock.galeria);
  },

  getConfig: function () {
    // Futuro: return fetch(API + "/config").then(r => r.json());
    return Promise.resolve(App.mock.config);
  },

  getPlaylists: function () {
    // Futuro: return fetch(API + "/playlists").then(r => r.json());
    return Promise.resolve(App.mock.playlists);
  }
};
