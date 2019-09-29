import createAsyncActions from './../../utils/createAsyncActions';
import http from './../../utils/http';

import {FETCH_POKEMON_LIST, FETCH_POKEMON_LIST_SUCCESS, FETCH_POKEMON_LIST_FAILED, SELECT_POKEMON} from './types';

export const fetchPokemon = createAsyncActions(
    [FETCH_POKEMON_LIST, FETCH_POKEMON_LIST_SUCCESS, FETCH_POKEMON_LIST_FAILED],
    (data:{}) => http.get(`https://pokeapi.co/api/v2/pokemon/`, data)
)

export const selectPokemon = (number: number) => {
    return {
        type: SELECT_POKEMON,
        number
    }
}