import {FETCH_POKEMON_DETAILS,FETCH_POKEMON_DETAILS_SUCCESS,FETCH_POKEMON_DETAILS_FAILED, FETCH_POKEMON_DESCRIPTION, FETCH_POKEMON_DESCRIPTION_SUCCESS, FETCH_POKEMON_DESCRIPTION_FAILED} from './../actions/types';

import {safeTraverse} from './../../utils/helpers';
import {PokemonDetails, PokemonSpecise} from './../../models/pokemonDetails';

export interface PokemonDetailsProps {
    asyncStatus: Boolean,
    pokemonDetailsList: PokemonDetails[],
    pokemonSpecies: PokemonSpecise[]
}

const initialState: PokemonDetailsProps = {
    asyncStatus: false,
    pokemonDetailsList: [],
    pokemonSpecies: []
}

export const pokemonDetails = (state = initialState, action: any): PokemonDetailsProps => {
    switch (action.type) {
        case FETCH_POKEMON_DETAILS: {
            return{
                ...state,
                asyncStatus: true
            }
        }
        case FETCH_POKEMON_DETAILS_SUCCESS: {
            const pokemonDetailsList = [...state.pokemonDetailsList];
            const res = safeTraverse(action, ['payload','res']);
            pokemonDetailsList.push(res);
            return {
                ...state,
                pokemonDetailsList,
                asyncStatus: false
            }
        }
        case FETCH_POKEMON_DETAILS_FAILED: {
            return {
                ...state,
                asyncStatus: false
            }
        }
        case FETCH_POKEMON_DESCRIPTION: {
            return {
                ...state,
                asyncStatus: true
            }
        }
        case FETCH_POKEMON_DESCRIPTION_SUCCESS:{
            const pokemonSpeciseList = [...state.pokemonSpecies];
            const res = safeTraverse(action, ['payload','res']);
            const pokemonSpecies = {
                flavor_text_entries: res.flavor_text_entries,
                name: res.name,
                id: res.id
            }
            pokemonSpeciseList.push(pokemonSpecies);
            return {
                ...state,
                pokemonSpecies: pokemonSpeciseList
            }
        }
        case FETCH_POKEMON_DESCRIPTION_FAILED: {
            return {
                ...state,
                asyncStatus: true
            }
        }
        default:
            return state
    }
}