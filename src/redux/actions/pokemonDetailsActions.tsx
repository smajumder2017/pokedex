import createAsyncActions from './../../utils/createAsyncActions';
import http from './../../utils/http';

import {FETCH_POKEMON_DETAILS,FETCH_POKEMON_DETAILS_SUCCESS,FETCH_POKEMON_DETAILS_FAILED} from './types';

export const fetchPokemonDetails = createAsyncActions(
    [FETCH_POKEMON_DETAILS,FETCH_POKEMON_DETAILS_SUCCESS,FETCH_POKEMON_DETAILS_FAILED],
    (number: number) => http.get(`https://pokeapi.co/api/v2/pokemon/${number}`) 
)