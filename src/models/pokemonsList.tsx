export interface PokemonsList {
    pokemons: Pokemon[],
    asyncStatus: Boolean
}

export interface Pokemon {
    name: string;
    url: string
}