var qnt = document.getElementById('qnt');
qnt.addEventListener('keyup', (e)=>{
    var key = e.which || e.keyCode;
    if (key == 13) {
        getPokemons(qnt.value);      
    }
})

function getPokemons(limit) {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=' + limit)
    .then(response => response.json())
    .then(allPokemon => {
        var pokemons = [];

        allPokemon.results.map((val)=>{
            fetch(val.url)
            .then(response =>response.json())
            .then(pokemonSingle => {
                pokemons.push({nome: val.name, img: pokemonSingle.sprites.front_default})

                if(pokemons.length == limit) {
                    var elemento = document.querySelector('main .pokemon-container');
                    elemento.innerHTML = "";

                    pokemons.map((p)=>{
                        elemento.innerHTML += `
                        <div class="pokemon-box">
                            <p>${p.nome}</p>
                            <img src="${p.img}">
                        </div>
                        `;
                    })
                }
            });
        })
    });
}