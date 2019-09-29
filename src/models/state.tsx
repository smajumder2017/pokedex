import {PokemonsList} from './pokemonsList';
import {PokemonDetailsProps} from './../redux/reducers/pokemonDetailsReducer';
export default interface AppState {
    pokemonsList: PokemonsList,
    pokemonDetails: PokemonDetailsProps
}