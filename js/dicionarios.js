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

const lendarios = [
    44, 145, 146, 150, 243, 244, 245, 249, 250,
    377, 378, 379, 380, 381, 382, 383, 384,
    480, 481, 482, 483, 484, 485, 486, 487, 488,
    638, 639, 640, 641, 642, 643, 644, 645, 646,
    716, 717, 718,
    785, 786, 787, 788, 789, 790, 791, 792, 800,
    888, 889, 890, 891, 892, 894, 895, 896, 897, 898,
    905,
    1001, 1002, 1003, 1004, 1007, 1008, 1009, 1010, 1014, 1015, 1016, 1017, 1024
];

const miticos = [
    151, 251, 385, 386, 489, 490, 491, 492, 493, 494,
    647, 648, 649, 719, 720, 721, 801, 802, 807, 808, 809,
    893, 1025
];

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

function VerificarRaridadeCard(elementoCard, pokemonId, ehShiny) {
    if (miticos.includes(pokemonId)) {
        elementoCard.classList.add("p-3", "rounded-lg", "shadow", "flex", "justify-center", "items-center", "flex-col", "gap-2", "border-2", "shadow-sm", "shadow-neutral-300", "bg-red-700" , "max-w-90");
        if (ehShiny) {
            elementoCard.classList.add("border-blue-600");
        } else {
            elementoCard.classList.add("border-red-900");
        }
    }
    else if (lendarios.includes(pokemonId)) {
        elementoCard.classList.add("p-3", "rounded-lg", "shadow", "flex", "justify-center", "items-center", "flex-col", "gap-2", "border-2", "shadow-sm", "shadow-neutral-300", "bg-amber-400", "max-w-90");
        if (ehShiny) {
            elementoCard.classList.add("border-blue-600");
        } else {
            elementoCard.classList.add("border-amber-200");
        }
    }
    else if (ultraBeasts.includes(pokemonId)) {
        elementoCard.classList.add("p-3", "rounded-lg", "shadow", "flex", "justify-center", "items-center", "flex-col", "gap-2", "border-2", "shadow-sm", "shadow-neutral-300", "bg-purple-400", "max-w-90");
        if (ehShiny) {
            elementoCard.classList.add("border-blue-600");
        } else {
            elementoCard.classList.add("border-purple-600");
        }
    }
    else if (ehShiny) {
        elementoCard.classList.add("p-3", "rounded-lg", "shadow", "flex", "justify-center", "items-center", "flex-col", "gap-2", "border-2", "shadow-sm", "shadow-neutral-300", "bg-blue-400", "border-blue-600", "max-w-90");
    }
    else {
        elementoCard.classList.add("p-3", "rounded-lg", "shadow", "flex", "justify-center", "items-center", "flex-col", "gap-2", "border-2", "shadow-sm", "shadow-neutral-300", "bg-white", "border-neutral-300", "max-w-90");
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


