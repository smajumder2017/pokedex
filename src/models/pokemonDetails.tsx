export interface PokemonDetails{
    abilities: Ability[],
    base_experience: number,
    forms: Form[],
    game_indices: GameIndice[],
    height: number,
    held_items: [],
    id: number,
    is_default: Boolean,
    location_area_encounters: string,
    moves: Move[],
    name: string,
    order: number,
    species: Species,
    sprites: any[],
    stats: Stat[],
    types: Type[],
    weight: number
}

interface Ability{
    ability: {
        name: string,
        url: string
    },
    is_hidden: Boolean,
    slot: number
}

interface Form{
    name: string,
    uurl: string
}

interface GameIndice {
    game_index: number,
    version: {
        name: string,
        url: string
    }
}

interface Move{
    move:{
        name: string,
        url: string
    },
    version_group_details: VersionGroupDetails[]
}

interface VersionGroupDetails {
    level_learned_at: number,
    move_learn_method: {
        name: string,
        url: string
    }
}

interface Species{
    name: string,
    url: string
}

interface Stat{
    base_stat: number,
    effort: number,
    stat:{
        name: string,
        url: string
    }
}

interface Type{
    slot: number,
    type: {
        name: string,
        url: string
    }
}