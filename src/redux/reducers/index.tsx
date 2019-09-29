import {combineReducers} from 'redux';

import pokemonsList from './pokemonListReducer';
import {pokemonDetails} from './pokemonDetailsReducer'

export default combineReducers({
    pokemonsList,
    pokemonDetails
});