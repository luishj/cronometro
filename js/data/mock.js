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
  // Cada playlist é uma PASTA em assets/musicas/: para adicionar músicas, solte
  // os .mp3 na pasta e liste-os em "faixas". Se um arquivo não existir, o app
  // pula a faixa sem travar. A ordem de reprodução é aleatória (embaralhada).
  playlists: [
    { id: "rock", nome: "🎸 Rock", faixas: [
        "assets/musicas/Rock/AC_DC - Highway to Hell.mp3",
        "assets/musicas/Rock/Aerosmith - Walk This Way.mp3",
        "assets/musicas/Rock/BLACKWELL, Promoting Sounds - lipstick.mp3",
        "assets/musicas/Rock/Drowning Pool - Bodies.mp3",
        "assets/musicas/Rock/Fall Out Boy - Centuries.mp3",
        "assets/musicas/Rock/Foo Fighters - Learn to Fly.mp3",
        "assets/musicas/Rock/Foo Fighters - Monkey Wrench.mp3",
        "assets/musicas/Rock/Gorillaz, De La Soul - Feel Good Inc..mp3",
        "assets/musicas/Rock/Guns N' Roses - Live And Let Die.mp3",
        "assets/musicas/Rock/Guns N' Roses - Sweet Child O' Mine.mp3",
        "assets/musicas/Rock/Halcyon A.D. - Chorus Eternal - Vocal Version.mp3",
        "assets/musicas/Rock/Linkin Park - Somewhere I Belong.mp3",
        "assets/musicas/Rock/Linkin Park - The Emptiness Machine.mp3",
        "assets/musicas/Rock/Muse - Hysteria.mp3",
        "assets/musicas/Rock/O.N.I - Haunted.mp3",
        "assets/musicas/Rock/Papa Roach - Last Resort.mp3",
        "assets/musicas/Rock/Radiohead - Creep.mp3",
        "assets/musicas/Rock/Red Hot Chili Peppers - Can't Stop.mp3",
        "assets/musicas/Rock/Red Hot Chili Peppers - Dani California.mp3",
        "assets/musicas/Rock/Rush - Tom Sawyer.mp3",
        "assets/musicas/Rock/Survivor - Eye of the Tiger.mp3",
        "assets/musicas/Rock/Sweet Gorilla - Good Thing.mp3",
        "assets/musicas/Rock/The Killers - Mr. Brightside.mp3",
        "assets/musicas/Rock/The Offspring - The Kids Aren't Alright.mp3",
        "assets/musicas/Rock/Tom Petty and the Heartbreakers - American Girl.mp3",
        "assets/musicas/Rock/Tomas Chris - ANIMAL.mp3",
        "assets/musicas/Rock/Tomas Chris - POPSICLE.mp3",
        "assets/musicas/Rock/Whethan, Waka Flocka Flame, Denzel Curry, BKTHERULA - ROOSTER.mp3",
        "assets/musicas/Rock/ptasinski, RJ Pasin - life force.mp3"
    ]},
    { id: "hip-hop", nome: "🎤 Hip-hop", faixas: [
        "assets/musicas/Hip-hop/50 Cent - In Da Club.mp3",
        "assets/musicas/Hip-hop/50 Cent - Just A Lil Bit.mp3",
        "assets/musicas/Hip-hop/50 Cent - P.I.M.P..mp3",
        "assets/musicas/Hip-hop/AC_DC - Back In Black.mp3",
        "assets/musicas/Hip-hop/AC_DC - Highway to Hell.mp3",
        "assets/musicas/Hip-hop/AC_DC - T.N.T..mp3",
        "assets/musicas/Hip-hop/AC_DC - Thunderstruck.mp3",
        "assets/musicas/Hip-hop/AC_DC - You Shook Me All Night Long.mp3",
        "assets/musicas/Hip-hop/Antonio Banderas, Los Lobos - Canción del Mariachi (Ilia Topuria _El Matador_ Anthem).mp3",
        "assets/musicas/Hip-hop/Bill Conti - Gonna Fly Now - Theme From _Rocky_.mp3",
        "assets/musicas/Hip-hop/Bobby Shmurda - Hot N_gga.mp3",
        "assets/musicas/Hip-hop/Body Head Bangerz, Roy Jones Jr., Choppa, Giz, Swellz - Go Hard, Go Home.mp3",
        "assets/musicas/Hip-hop/Body Head Bangerz, Roy Jones Jr., Mr Magic, Choppa - Body Head Anthem.mp3",
        "assets/musicas/Hip-hop/Body Head Bangerz, Roy Jones Jr., Mr Magic, JUVENILE - Don't Start It.mp3",
        "assets/musicas/Hip-hop/Body Head Bangerz, Roy Jones Jr., Mr Magic, Trouble - Can't Be Touched.mp3",
        "assets/musicas/Hip-hop/Deep Purple - Smoke On The Water - Remastered 2012.mp3",
        "assets/musicas/Hip-hop/Delinquent Habits - Return of the Tres.mp3",
        "assets/musicas/Hip-hop/Dr. Dre, Eminem - Forgot About Dre.mp3",
        "assets/musicas/Hip-hop/Dr. Dre, Snoop Dogg - Still D.R.E..mp3",
        "assets/musicas/Hip-hop/Eminem - Lose Yourself - From _8 Mile_ Soundtrack.mp3",
        "assets/musicas/Hip-hop/Eminem, 50 Cent, Nate Dogg - Never Enough.mp3",
        "assets/musicas/Hip-hop/Eminem, Joyner Lucas - Lucky You (feat. Joyner Lucas).mp3",
        "assets/musicas/Hip-hop/Eminem, Nate Dogg - Till I Collapse.mp3",
        "assets/musicas/Hip-hop/FILV, Edmofo, Jvstin, Emma Peters - Clandestina (feat. Emma Peters) - JVSTIN Remix.mp3",
        "assets/musicas/Hip-hop/Gio Pika - Буйно голова.mp3",
        "assets/musicas/Hip-hop/Guns N' Roses - Sweet Child O' Mine.mp3",
        "assets/musicas/Hip-hop/Hollywood Undead - Undead.mp3",
        "assets/musicas/Hip-hop/Jeezy, Kanye West - Put On.mp3",
        "assets/musicas/Hip-hop/Kendrick Lamar - HUMBLE..mp3",
        "assets/musicas/Hip-hop/Ludwig Göransson - You're a Creed.mp3",
        "assets/musicas/Hip-hop/Lynyrd Skynyrd - Sweet Home Alabama.mp3",
        "assets/musicas/Hip-hop/Marilyn Manson - Sweet Dreams (Are Made Of This).mp3",
        "assets/musicas/Hip-hop/Marilyn Manson - The Beautiful People.mp3",
        "assets/musicas/Hip-hop/Meek Mill, YG, Snoop Dogg - That's My N____ (with Meek Mill, YG & Snoop Dogg).mp3",
        "assets/musicas/Hip-hop/Outlandish - Guantanamo.mp3",
        "assets/musicas/Hip-hop/Pure Negga, Skillz Beatz - Cnv Sound, Vol. 14.mp3",
        "assets/musicas/Hip-hop/Rag'n'Bone Man - Human.mp3",
        "assets/musicas/Hip-hop/Sha Gz - New Opp.mp3",
        "assets/musicas/Hip-hop/Skrillex, Kendrick Lamar - HUMBLE. - SKRILLEX REMIX.mp3",
        "assets/musicas/Hip-hop/Snoop Dogg, Pharrell Williams - Drop It Like It's Hot.mp3",
        "assets/musicas/Hip-hop/Survivor - Eye of the Tiger.mp3",
        "assets/musicas/Hip-hop/The Game, Skrillex - El Chapo.mp3",
        "assets/musicas/Hip-hop/The Rolling Stones - (I Can't Get No) Satisfaction - Mono.mp3",
        "assets/musicas/Hip-hop/Valentine - Take You Back (Street Corner Song From _Rocky_) - From _Rocky_ Soundtrack _ Remastered 2006.mp3"
    ]},
    { id: "kids", nome: "🧒 Kids", faixas: [
        "assets/musicas/kids/3 Palavrinhas - Cabeça, Ombro, Joelho e Pé.mp3",
        "assets/musicas/kids/3 Palavrinhas - Copa do Mundo.mp3",
        "assets/musicas/kids/Aline Barros - Dança do Pinguim.mp3",
        "assets/musicas/kids/Aline Barros, Lito Atalaia - Chevere (feat. Lito Atalaia).mp3",
        "assets/musicas/kids/Bob Zoom - Pula Pipoquinha.mp3",
        "assets/musicas/kids/Galerinha do Céu, Céu Kids - A Alegria Está no Coração.mp3",
        "assets/musicas/kids/Galerinha do Céu, Céu Kids - A Vida de Jesus.mp3",
        "assets/musicas/kids/Galerinha do Céu, Céu Kids - Davi, o Valente Rei.mp3",
        "assets/musicas/kids/Galerinha do Céu, Céu Kids - Miriã Dançou na Presença de Deus.mp3",
        "assets/musicas/kids/Galerinha do Céu, Céu Kids - No Egito Escravo Fui.mp3",
        "assets/musicas/kids/Galerinha do Céu, Céu Kids - É Muito Bom Ter Jesus no Coração.mp3",
        "assets/musicas/kids/Ivan Parente, Glauco Marques - Quem Dorme É O Leão.mp3",
        "assets/musicas/kids/Leandro Borges - Eu Nasci.mp3",
        "assets/musicas/kids/Minha Vida é Uma Viagem - Tudo Vai Terminar Bem.mp3",
        "assets/musicas/kids/Mundo Bita - Fazendinha.mp3",
        "assets/musicas/kids/Mundo Bita - Fundo do Mar.mp3",
        "assets/musicas/kids/Mundo da Lara e mari - Hora de Brincar.mp3",
        "assets/musicas/kids/Palavra Cantada - Ciranda.mp3",
        "assets/musicas/kids/Patati Patatá - Comer Comer.mp3",
        "assets/musicas/kids/Patati Patatá - O Ronco do Vovô.mp3",
        "assets/musicas/kids/Patati Patatá - Piuí Abacaxi.mp3",
        "assets/musicas/kids/Patati Patatá - Se Você Quer Sorrir.mp3",
        "assets/musicas/kids/Patricia Marx - Espelho.mp3",
        "assets/musicas/kids/Priscilla & Yudi - Carro - Céu.mp3",
        "assets/musicas/kids/Stella Laura, Todah Music - Destino ao Céu.mp3",
        "assets/musicas/kids/Turma da Toy - Parabéns Crente.mp3",
        "assets/musicas/kids/Yasmin Verissimo - Bonde do Amor.mp3"
    ]},
    { id: "sem-musica", nome: "🔇 Sem música", faixas: [] }
  ]
};

// Playlist "Geral" = Rock + Hip-hop juntos (a Kids fica de fora).
// Montada automaticamente a partir das outras pastas e inserida no TOPO da lista,
// então basta adicionar música em Rock/Hip-hop que ela entra aqui também.
(function () {
  var porId = {};
  App.mock.playlists.forEach(function (p) { porId[p.id] = p; });
  var geral = {
    id: "geral",
    nome: "🎵 Geral",
    faixas: porId.rock.faixas.concat(porId["hip-hop"].faixas)
  };
  App.mock.playlists.unshift(geral);
})();
