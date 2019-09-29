import {FETCH_POKEMON_DETAILS,FETCH_POKEMON_DETAILS_SUCCESS,FETCH_POKEMON_DETAILS_FAILED} from './../actions/types';

import {safeTraverse} from './../../utils/helpers';
import {PokemonDetails} from './../../models/pokemonDetails';

export interface PokemonDetailsProps {
    pokemonDetailsList: PokemonDetails[]
}

const initialState: PokemonDetailsProps = {
    pokemonDetailsList: []
}

export const pokemonDetails = (state = initialState, action: any): PokemonDetailsProps => {
    switch (action.type) {
        case FETCH_POKEMON_DETAILS: {
            return{
                ...state
            }
        }
        case FETCH_POKEMON_DETAILS_SUCCESS: {
            const pokemonDetailsList = [...state.pokemonDetailsList];
            const res = safeTraverse(action, ['payload','res']);
            pokemonDetailsList.push(res);
            return {
                ...state,
                pokemonDetailsList
            }
        }
        case FETCH_POKEMON_DETAILS_FAILED: {
            return {
                ...state
            }
        }
        default:
            return state
    }
}