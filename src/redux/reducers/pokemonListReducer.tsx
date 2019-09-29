import { FETCH_POKEMON_LIST, FETCH_POKEMON_LIST_SUCCESS, FETCH_POKEMON_LIST_FAILED, SELECT_POKEMON } from './../actions/types';

import {PokemonsList} from './../../models/pokemonsList';
import {safeTraverse} from './../../utils/helpers';

const initialState: PokemonsList = {
  pokemons:[],
  selected: null,
  asyncStatus: false
}

const pokemonsList = (state = initialState, action: any): PokemonsList => {
  switch (action.type) {
    case FETCH_POKEMON_LIST: {
      return {
        ...state,
        asyncStatus: true
      }
    }
    case FETCH_POKEMON_LIST_SUCCESS: {
      const pokemons = state.pokemons;
      const nextPokemons = [...pokemons, ...safeTraverse(action, ['payload','res', 'results'])];
      return {
        ...state,
        asyncStatus: false,
        pokemons: nextPokemons
      }
    }
    case FETCH_POKEMON_LIST_FAILED: {
      return {
        ...state,
        asyncStatus: false
      }
    }
    case SELECT_POKEMON: {
      return{
        ...state,
        selected: action.number
      }
    }
    default:
      return state;
  }
}

export default pokemonsList;