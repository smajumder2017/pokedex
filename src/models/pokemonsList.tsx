export interface PokemonsList {
    pokemons: Pokemon[],
    asyncStatus: Boolean,
    selected: number | null
}

export interface Pokemon {
    name: string;
    url: string
}