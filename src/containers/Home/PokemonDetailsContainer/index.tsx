import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import AppState from './../../../models/state';
import { PokemonDetails } from './../../../models/pokemonDetails';
import { fetchPokemonDetails } from './../../../redux/actions/pokemonDetailsActions';
import SelectedPokemonSelector from './../../../selectors/selectedPokemonDetails';

interface IPokemonDetailsContainerProps {
  selectedPokemon: number | null,
  pokemonDetails: PokemonDetails,
  fetchPokemonDetails: typeof fetchPokemonDetails,
}

const PokemonDetailsConatiner: React.FC<IPokemonDetailsContainerProps> = (props) => {

  const fetchPokemonDetails = async (number: number | null) => {
    if (number) {
      await props.fetchPokemonDetails(number);
    }
  }

  useEffect(() => {
    fetchPokemonDetails(props.selectedPokemon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedPokemon]);

  if (props.pokemonDetails) {
    return (
      <div>
        {props.pokemonDetails.name}
        <img
          alt=""
          src={require(`./../../../assets/pokemons/${props.selectedPokemon}.svg`)}
          width="200"
          height="200"
        />
      </div>
    )
  } else {
    return null
  }

}

const mapStateToProps = (state: AppState) => {
  return {
    selectedPokemon: state.pokemonsList.selected,
    pokemonDetails: SelectedPokemonSelector(state)
  }
}

export default connect(mapStateToProps, { fetchPokemonDetails })(PokemonDetailsConatiner);