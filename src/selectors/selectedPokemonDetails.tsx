import {createSelector} from 'reselect';
import _ from 'lodash';

import AppState from './../models/state';
import {PokemonDetails} from './../models/pokemonDetails';

const selectedPokemonSelector = (state:AppState)  => state.pokemonsList.selected;
const pokemonSelector = (state:AppState) => state.pokemonDetails.pokemonDetailsList;

const getPokemon = (pokemonSelector: PokemonDetails[], selectedPokemonSelector: number|null) => {
    const selectedPokemon = _.filter(pokemonSelector, pokemon => pokemon.id === selectedPokemonSelector);
    return selectedPokemon[0];
}

export default createSelector(
    pokemonSelector,
    selectedPokemonSelector,
    getPokemon
);