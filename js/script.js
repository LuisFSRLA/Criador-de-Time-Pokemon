
const button = document.querySelector("#btn");
const container = document.querySelector("#container");

import {
  escolherCorPorTipo,
  classesParagrafo,
  verificarRaridadeCard,
  classesBotao,
  verificarCorDoTexto,
  verificarPeso,
  quebraLinha,
  verificarEstaticas,
  verificarCorDoNome,
  classesBotaoAudio,
  dexHyphenados,
  audioPkmLevelUp,
  audioPkmPlink,
  pokemonsCapturados,
  classesBotaoAtivado,
  classesBotaoDesativado
} from "./dicionarios.js";
import { 
  eventos
} from "./efeitos.js";

button.addEventListener("click", () => {
  const audioButtonAleatorio = Math.floor(Math.random() * 2) + 1;
  let temShiny = 0;

  if (audioButtonAleatorio == 1) {
    audioPkmLevelUp.play();
  }
  else {
    audioPkmPlink.play();
  }
  
  for (let i = 0; i < 6; i++) {
    const idAleatorio = Math.floor(Math.random() * 1025) + 1;

      fetch(`https://pokeapi.co/api/v2/pokemon/${idAleatorio}`)
      .then((response) => response.json())
      .then((pokemon) => {
        //chama a api pokemon-species que dao mais descrição sobre a especie
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${idAleatorio}`)
          .then((response) => response.json())
          .then(async (pokemonSpecies) => {
            const entradaDescricao =
              pokemonSpecies.flavor_text_entries.find(e => e.language.name === 'pt') ||
              pokemonSpecies.flavor_text_entries.find(e => e.language.name === 'en');

            const descricaoPokemon = entradaDescricao
              ? entradaDescricao.flavor_text.replace(/[\n\f\r]/g, ' ')
              : 'Descrição indisponível.';

        const audioShinyAleatorio = Math.floor(Math.random() * 2);
  
        let nomePokemon = pokemon.name;
        if (!dexHyphenados.includes(idAleatorio)) {
            nomePokemon = nomePokemon.replace(/-.*/, '');
        }
        let imagemPokemon = pokemon.sprites.other["home"].front_default || pokemon.sprites.front_default;
        const alturaPokemon = pokemon.height / 10;
        const pesoPokemon = pokemon.weight / 10;
        let shiny = 0;
        const idFormatado = String(idAleatorio).padStart(4, "0");
        const chanceCapturaPokemon = pokemonSpecies.capture_rate;

        // Estatísticas base (HP, ataque, defesa, etc.)
        const ps = pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat;
        const atk = pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat;
        const def = pokemon.stats.find((s) => s.stat.name === "defense")?.base_stat;
        const sp_atk = pokemon.stats.find((s) => s.stat.name === "special-attack")?.base_stat;
        const sp_def = pokemon.stats.find((s) => s.stat.name === "special-defense")?.base_stat;
        const speed = pokemon.stats.find((s) => s.stat.name === "speed")?.base_stat;

        // CRIAÇÃO DOS ELEMENTOS HTML DO CARD
        const card = document.createElement("div");
        const imagem = document.createElement("img");
        const nome = document.createElement("p");
        const containerTipos = document.createElement("div");
        const numeroDex = document.createElement("p");
        const textoAltura = document.createElement("p");
        const textoPeso = document.createElement("p");
        const descricao = document.createElement("p");
        const descricaoText = document.createElement("h1");
        const chanceCaptura = document.createElement("p");
        const containerHabilidades = document.createElement("div");

        // Elementos das estatísticas
        const containerEstaticas = document.createElement("div");
        containerEstaticas.classList.add("flex","gap-2","flex-wrap","justify-center","grid", "grid-cols-3");
        const vidaBasico = document.createElement("p");
        const ataqueBasico = document.createElement("p");
        const defesaBasico = document.createElement("p");
        const ataqueEspecial = document.createElement("p");
        const defesaEspecial = document.createElement("p");
        const velocidade = document.createElement("p");

        // Botões de links externos
        const botaoPokedex = document.createElement("a");
        const botaoBulbapedia = document.createElement("a");
        const botaoShowdown = document.createElement("a");
        const botaoAudio = document.createElement("button");

        //Coloca os href antes da mudança do nome
        botaoPokedex.href = `https://www.pokemon.com/br/pokedex/${pokemon.name}`;        
        botaoBulbapedia.href = `https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}_(Pokémon)`;
        botaoShowdown.href = `https://dex.pokemonshowdown.com/pokemon/${pokemon.name}`;

        // PROBABILIDADE DE SHINY (1 em 4096, taxa clássica dos jogos)
        const porcentagemShiny = Math.floor(Math.random() * 4096) + 1;
        if (porcentagemShiny == 1) {
          imagemPokemon = pokemon.sprites.other["home"].front_shiny || pokemon.sprites.front_shiny;
          shiny = 1;
          nomePokemon = `${nomePokemon} Shiny`;
        }

        await verificarRaridadeCard(card, idAleatorio, shiny);
        
        // Imagem do Pokémon
        imagem.src = imagemPokemon;
        imagem.alt = nomePokemon;
        imagem.classList.add("w-40", "h-40", "rounded-md");

        // Nome do Pokémon
        nome.textContent = nomePokemon;
        nome.classList.add(...classesParagrafo);

        // Tipagem (cria uma "pill" colorida para cada tipo)
        containerTipos.classList.add("flex", "gap-1", "flex-wrap", "justify-center");
        pokemon.types.forEach((tipoObj) => {
          const nomeDoTipo = tipoObj.type.name;
          const corDoTipo = escolherCorPorTipo(nomeDoTipo);
          const divTipo = document.createElement("div");
          divTipo.textContent = nomeDoTipo;
          divTipo.classList.add(`bg-${corDoTipo}`,"border-2","border-black/20","text-neutral-100","text-xs","px-6","mx-1","py-1","rounded-md","capitalize","mt-1");
          containerTipos.appendChild(divTipo);
        });

        // Número da Pokédex
        numeroDex.textContent = `Dex: #${idFormatado}`;
        numeroDex.classList.add(...classesParagrafo);

        // Habilidade
        containerHabilidades.classList.add("flex", "flex-col", "items-center", "gap-1");
        pokemon.abilities.forEach((habilidadeObj) => {
          const nomeDaHabilidade = habilidadeObj.ability.name.replaceAll("-", " ");
          const ehOculta = habilidadeObj.is_hidden;
          const textoHabilidade = document.createElement("p");
          textoHabilidade.textContent = ehOculta
            ? `Habilidade Oculta: ${nomeDaHabilidade}`
            : `Habilidade: ${nomeDaHabilidade}`;
          textoHabilidade.classList.add(...classesParagrafo);
          verificarCorDoTexto(textoHabilidade, idAleatorio, shiny);
          containerHabilidades.appendChild(textoHabilidade);
        });

        // Altura
        textoAltura.textContent = `Altura: ${alturaPokemon}m`;
        textoAltura.classList.add(...classesParagrafo);

        verificarPeso(pesoPokemon, textoPeso);
        textoPeso.classList.add(...classesParagrafo);

        descricaoText.textContent = "Descrição:";
        descricaoText.classList.add(...classesParagrafo, "-mb-2");
        descricao.textContent = descricaoPokemon;
        descricao.classList.add(...classesParagrafo, "text-xs");

        chanceCaptura.textContent = `Chance de Captura: ${chanceCapturaPokemon}`;
        chanceCaptura.classList.add(...classesParagrafo);

        // Estatísticas base (monta o texto "Nome: valor" + define cor conforme o valor)
        quebraLinha(vidaBasico, "HP", ps);
        verificarEstaticas(ps, vidaBasico);

        quebraLinha(ataqueBasico, "Atk", atk);
        verificarEstaticas(atk, ataqueBasico);

        quebraLinha(defesaBasico, "Def", def);
        verificarEstaticas(def, defesaBasico);

        quebraLinha(ataqueEspecial, "Sp.Atk", sp_atk);
        verificarEstaticas(sp_atk, ataqueEspecial);

        quebraLinha(defesaEspecial, "Sp.Def", sp_def);
        verificarEstaticas(sp_def, defesaEspecial);

        quebraLinha(velocidade, "Spe", speed);
        verificarEstaticas(speed, velocidade);
        
        // Botão: Audio
        botaoAudio.textContent = "Tocar Audio";
        botaoAudio.classList.add(...classesBotaoAudio);
        botaoAudio.addEventListener("click", () => {
          const audio = new Audio(pokemon.cries.latest);
          audio.volume = 0.3;
          audio.play();
        });

        // Botão: Pokédex oficial
        botaoPokedex.textContent = "Pokedex";
        botaoPokedex.classList.add(...classesBotao, "bg-red-600", "hover:bg-red-700");

        botaoBulbapedia.textContent = "Bulbapedia";
        botaoBulbapedia.classList.add(...classesBotao, "bg-green-600", "hover:bg-green-700");

        botaoShowdown.textContent = "Pokemon Showdown";
        botaoShowdown.classList.add(...classesBotao, "bg-blue-600", "hover:bg-blue-700");

        //colocar pokemon no pokemonscapturados
        pokemonsCapturados.push({ id: idAleatorio, shiny: shiny === 1 });

        verificarCorDoNome(nome, idAleatorio, shiny);
        verificarCorDoTexto(numeroDex, idAleatorio, shiny);
        verificarCorDoTexto(textoAltura, idAleatorio, shiny);
        verificarCorDoTexto(textoPeso, idAleatorio, shiny);
        verificarCorDoTexto(descricao, idAleatorio, shiny);
        verificarCorDoTexto(descricaoText, idAleatorio, shiny);
        verificarCorDoTexto(chanceCaptura, idAleatorio, shiny);
        containerEstaticas.append(
          vidaBasico,
          ataqueBasico,
          defesaBasico,
          ataqueEspecial,
          defesaEspecial,
          velocidade
        );

        card.append(
          imagem,
          nome,
          numeroDex,
          containerTipos,
          botaoAudio,
          containerHabilidades,
          textoAltura,
          textoPeso,
          descricaoText,
          descricao,
          chanceCaptura,
          containerEstaticas,
          botaoPokedex,
          botaoBulbapedia,
          botaoShowdown
        );
        
        container.appendChild(card);
        eventos(pokemonsCapturados, shiny, audioShinyAleatorio, container)
      })
      .catch((error) => {
        console.error("Erro ao carregar pokemon:", error);
      });
      
      })
      
  }
  
    
    // Desabilita o botão
    button.disabled = true;
    button.textContent = "Aguarde...";
    button.classList.remove(...classesBotaoAtivado);
    button.classList.add(...classesBotaoDesativado);

    setTimeout(function() {
        button.disabled = false;
        button.textContent = "Criador de time";
        button.classList.add(...classesBotaoAtivado);
        button.classList.remove(...classesBotaoDesativado);
    }, 4000);
});

