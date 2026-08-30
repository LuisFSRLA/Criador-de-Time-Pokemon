export {
    escolherCorPorTipo,//utiliza
    classep,//utiliza
    VerificarRaridadeCard,//utiliza
    classeBttn,//utiliza
    VerificarCorDoTexto,//utiliza
    VerificarPeso,//utiliza
    classeEstaticas,//utiliza
    quebraLinha,//utiliza
    VerificarEstaticas,//utiliza
    VerificarCorDoNome,
    classeBttnAudio,
    dexHyphenados,
    audioPkmLevelUp,
    audioPkmPlink,
    pokemonsCapturados,
    classeBttnAtivado,
    classeBttnDesativado
}

// DADOS ESTÁTICOS (dex de pokémons especiais)

const coresPorTipo = {
    normal: "neutral-400",
    fire: "orange-500",
    water: "blue-500",
    electric: "yellow-600",
    grass: "green-500",
    ice: "cyan-600",
    fighting: "red-700",
    poison: "purple-600",
    ground: "amber-700",
    flying: "violet-300",
    psychic: "pink-500",
    bug: "lime-600",
    rock: "amber-600",
    ghost: "violet-700",
    dragon: "indigo-600",
    dark: "stone-600",
    steel: "slate-600",
    fairy: "pink-300",
};

const ultraBeasts = [
  793, 794, 795, 796, 797, 798, 799, 805, 806
];
const dexHyphenados = [
    250, 474, 784, 785, 786, 1022, 1023, 1024, 1025
];   
        const audioPkmLevelUp = new Audio("audios/pkmlevelup.ogg");
        const audioPkmPlink = new Audio("audios/pkmplink.ogg");
        let pokemonsCapturados = [];

// CLASSES CSS REUTILIZÁVEIS

const classep = [
    "font-semibold", "text-center", "text-sm", "capitalize" 
];

const classeEstaticas = [
    "h-auto", "w-auto", "px-2", "py-1", "border-2", "rounded-lg", "mt-1", "bg-white", "text-center"
];

const classeBttn = [
    "w-full", "text-white", "font-semibold", "py-2", "px-4","rounded-lg", "transition-colors", "text-center"
];

const classeBttnAtivado = [
    "bg-blue-600", "hover:bg-blue-700","hover:outline-blue-700", "active:bg-green-700", "active:outline-2", "active:outline-green-700"
]
const classeBttnDesativado = [
    "bg-red-600", "hover:bg-red-700", "hover:outline-2" ,"hover:outline-offset-2", "hover:outline-red-700"
]

const classeBttnAudio = [
    "w-35", "text-white", "font-semibold", "py-2", "px-4","rounded-lg", "transition-colors", "text-center", "bg-amber-600", "hover:bg-amber-700", "text-sm", "hover:outline-3", "outline-offset-1", "outline-amber-800"
];

// FUNÇÕES DE COR / ESTILO POR TIPO E RARIDADE

function escolherCorPorTipo(tipo) {
    return coresPorTipo[tipo] || "neutral-400";
}

async function VerificarRaridadeCard(elementoCard, pokemonId, ehShiny) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        const pokemonSpecies = await response.json();
        
        // Determina raridade baseado em dados da API
        const isLegendary = pokemonSpecies.is_legendary;
        const isMythical = pokemonSpecies.is_mythical;
        
        // Determina cor baseado na raridade
        let classesCor = ["p-3", "rounded-lg", "flex", "justify-center", "items-center", "flex-col", "gap-2", "max-w-90"];
        
        if (isMythical) {
            classesCor.push(ehShiny ? "bg-purple-800" : "bg-red-700");
        }
        else if (isLegendary) {
            classesCor.push(ehShiny ? "bg-green-600" : "bg-amber-400");
        }
        else if (ultraBeasts.includes(pokemonId)) {
            classesCor.push(ehShiny ? "bg-indigo-700" : "bg-purple-400");
        }
        else if (ehShiny) {
            classesCor.push("bg-blue-400");
        }
        else {
            classesCor.push("bg-white");
        }
        
        elementoCard.classList.add(...classesCor);
    } catch (error) {
        console.error("Erro ao verificar raridade:", error);
        // Fallback para branco se houver erro
        elementoCard.classList.add("p-3", "rounded-lg", "flex", "justify-center", "items-center", "flex-col", "gap-2", "bg-white", "max-w-90");
    }
}

function VerificarCorDoTexto(elementoTexto, pokemonId, ehShiny) {
    const ehEspecial = miticos.includes(pokemonId) || lendarios.includes(pokemonId) || ultraBeasts.includes(pokemonId);

    if (ehEspecial || ehShiny) {
        elementoTexto.classList.add("text-neutral-200/80");
    }
    else {
        elementoTexto.classList.add("text-neutral-700");
    }
}

function VerificarCorDoNome(elementoNome, pokemonId, ehShiny) {
    const ehEspecial = miticos.includes(pokemonId) || lendarios.includes(pokemonId) || ultraBeasts.includes(pokemonId);

    if (ehEspecial || ehShiny) {
        elementoNome.classList.add("text-white/90");
    }
    else {
        elementoNome.classList.add("text-mist-800");
    }
}

// FUNÇÕES DE CONTEÚDO / TEXTO DO CARD
function VerificarPeso(pesoEmKg, elementoPeso) {
    if (pesoEmKg >= 1000) {
        elementoPeso.textContent = `Peso: ${pesoEmKg / 1000}T`;
    }
    else {
        elementoPeso.textContent = `Peso: ${pesoEmKg}kg`;
    }
}

function quebraLinha(elemento,label, valor) {
    elemento.textContent = `${label}`;
    elemento.appendChild(document.createElement('br'));
    elemento.append(valor);
    elemento.classList.add(...classep, ...classeEstaticas,"-pl-1");
}


// FUNÇÕES DE ESTATÍSTICAS (cores por faixa de valor)

function VerificarEstaticas(valorStat, elementoStat) {
    if (valorStat < 25) {
        //vermelho
        elementoStat.classList.add("text-red-400", "border-red-400");
    }
    else if (valorStat < 50) {
        //laranja
        elementoStat.classList.add("text-orange-400", "border-orange-400");
    }
    else if (valorStat < 75) {
        //amarelo
        elementoStat.classList.add("text-yellow-400", "border-yellow-400");
    }
    else if (valorStat < 100) {
        //verde
        elementoStat.classList.add("text-green-500", "border-green-500");
    }
    else if (valorStat < 125) {
        //azul-claro
        elementoStat.classList.add("text-cyan-500", "border-cyan-500");
    }
    else {
        //azul-escuro
        elementoStat.classList.add("text-blue-700", "border-blue-700");
    }
}


