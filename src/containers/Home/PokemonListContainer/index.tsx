import React, {useEffect, useState} from 'react';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import debounce from "lodash.debounce";

import AppState from './../../../models/state';
import {PokemonsList,Pokemon} from './../../../models/pokemonsList';

import {PokemonListItem} from './../../../components/PokemonsListItem';
import {Loader} from './../../../components/Loader';
import {fetchPokemon, selectPokemon} from './../../../redux/actions/pokemonsListActions';

import {safeTraverse} from './../../../utils/helpers';
import './styles.scss';

interface IPokemonsListContainerProps {
  pokemonsList: PokemonsList,
  fetchPokemon: typeof fetchPokemon,
  selectPokemon: typeof selectPokemon
}

const PokemonListContainer: React.FC<IPokemonsListContainerProps> = (props) => {
  let pkmnListContainer = React.createRef<HTMLDivElement>();
  
  const [offset, setOffSet] = useState(0);
  const [limit] = useState(20);

  const fetchPokemonList = async () =>{
    await props.fetchPokemon({offset, limit});
    setOffSet(limit + offset);
  }

  useEffect(()=>{
    setOffSet(limit + offset);
    fetchPokemonList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleScroll = debounce(() => {
    if (
      safeTraverse(pkmnListContainer, ['current','scrollHeight']) === safeTraverse(pkmnListContainer, ['current','scrollTop'])
      + safeTraverse(pkmnListContainer, ['current','offsetHeight'])
    ) {
      fetchPokemonList();
    }
  }, 100);

  const handlePokemonSelect = (number: number) => {
    props.selectPokemon(number)
  }

  const pokemons = safeTraverse(props,['pokemonsList', 'pokemons']) || []
  return (
    <div>
      {safeTraverse(props,['pokemonsList', 'asyncStatus']) && <Loader />}
      <div className="pkmn-list-container" onScroll={handleScroll} ref={pkmnListContainer}>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <div>
          {
            pokemons.map((item: Pokemon, index: number) => {
              return (
                <PokemonListItem key={index} pokemon={item} number={index + 1} handleSelect={() => {handlePokemonSelect(index+1)}}/>
              )
            })
          }
        </div>
    </div>
    </div>
    
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    pokemonsList: state.pokemonsList
  }
}

export default connect(mapStateToProps, {fetchPokemon, selectPokemon})(PokemonListContainer);