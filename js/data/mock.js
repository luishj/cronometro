/* Dados mockados. No futuro, a API substitui isto (ver data/source.js).
   Tempos em segundos. */
window.App = window.App || {};

App.mock = {
  presets: [
    { id: "aquecimento",   nome: "Aquecimento 10 min", icone: "🔥", tempoLutaSeg: 600, qtdLutas: 1,  descansoSeg: 0 },
    { id: "round-5min",    nome: "Round de 5 min",     icone: "🥋", tempoLutaSeg: 300, qtdLutas: 10, descansoSeg: 60 },
    { id: "round-4min",    nome: "Round de 4 min",     icone: "🥋", tempoLutaSeg: 240, qtdLutas: 10, descansoSeg: 60 },
    { id: "round-3min",    nome: "Round de 3 min",     icone: "🥊", tempoLutaSeg: 180, qtdLutas: 10, descansoSeg: 60 }
  ],

  // Sem fotos reais ainda: usamos placeholders coloridos (cor + legenda).
  galeria: [
    { id: "g1", cor: "#1f2a44", titulo: "Patrocinador — Academia Sysmo", categoria: "patrocinador" },
    { id: "g2", cor: "#3a1f44", titulo: "Campeonato Estadual 2025", categoria: "campeonato" },
    { id: "g3", cor: "#1f4433", titulo: "Patrocinador — Nutri Fight", categoria: "patrocinador" },
    { id: "g4", cor: "#442a1f", titulo: "Pódio — Copa Regional", categoria: "campeonato" }
  ],

  config: { segundosPorFoto: 6 },

  // Playlists tocadas durante as lutas. Depois de escolher o round, o app
  // pergunta qual playlist usar (ex.: uma só para o treino Kids).
  // Cada playlist é uma "pasta": coloque os .mp3 na pasta indicada e liste-os
  // em "faixas". Se um arquivo não existir, o app pula a faixa sem travar.
  playlists: [
    { id: "geral", nome: "🎵 Geral", faixas: [
        "assets/musicas/teste.mp3"
    ]},
    { id: "kids", nome: "🧒 Kids", faixas: [
        "assets/musicas/kids/teste.mp3"
    ]},
    { id: "sem-musica", nome: "🔇 Sem música", faixas: [] }
  ]
};
