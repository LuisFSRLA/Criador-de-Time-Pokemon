export {
    eventos,
}

const audioOhmyGod = new Audio("audios/oh-my-god-meme.ogg");
audioOhmyGod.volume = 0.2;
const audioOhmyGodJojo = new Audio("audios/oh-my-god-jojo.ogg");
audioOhmyGodJojo.volume = 0.2;
const audioShinyPokemonAntigo = new Audio("audios/shiny-pokemon.ogg");
audioShinyPokemonAntigo.volume = 0.2;
const audioShinyPokemonNovo = new Audio("audios/shiny-pokemon-sound.ogg");
audioShinyPokemonNovo.volume = 0.2;
let jaMostrouAlertaShiny = false;

function eventos(pokemonsCapturados, shiny, audioShinyAleatorio, container) {
    const capturouGiratina = pokemonsCapturados.some((p) => p.id === 487);
    const tiposDosPokemons = pokemonsCapturados.map((p) => p.tipos).flat();

    if (capturouGiratina && shiny === 1) {
        Swal.fire({
            title: 'Holy Moly',
            text: "Você Capturou Giratina Shiny",
            imageUrl: "img/OhmyGOD.gif",
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: "OHMYGOD",
            backdrop: `rgba(0,0,123,0.4) left top no-repeat`
        });
        audioOhmyGod.play();
    }
    else if (shiny === 1) {
        if (jaMostrouAlertaShiny != true) {
            (audioShinyAleatorio === 1)
            ? audioShinyPokemonAntigo.play()
            : audioShinyPokemonNovo.play();
            jaMostrouAlertaShiny = true;
            Swal.fire({
                title: 'Um SHINY apareceu',
                imageUrl: "img/youShine.jpeg",
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: "Gem Alert",
                backdrop: `rgba(0,0,123,0.4) left top no-repeat`
            });
        }
    }
    else if (capturouGiratina) {
        audioOhmyGodJojo.play();
        Swal.fire({
            title: 'Holy Moly',
            text: "Você Capturou Giratina",
            imageUrl: "./img/gem_alert.jpg",
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: "Gem Alert",
            backdrop: `rgba(0,0,123,0.4) left top no-repeat`
        });
    }

    if (container.children.length > 6) {
        for (let i = 0; i < 6; i++) {
            container.removeChild(container.firstChild);
            pokemonsCapturados.shift();
        }
        jaMostrouAlertaShiny = false;
    }
}
