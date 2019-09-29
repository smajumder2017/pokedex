import React, {useEffect, useState} from 'react';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import debounce from "lodash.debounce";

import AppState from './../../../models/state';
import {PokemonsList,Pokemon} from './../../../models/pokemonsList';

import {PokemonListItem} from './../../../components/PokemonsListItem';

import {fetchPokemon} from './../../../redux/actions/pokemonsListActions';

import {safeTraverse} from './../../../utils/helpers';
import './styles.scss';

interface IPokemonsListContainerProps {
  pokemonsList: PokemonsList,
  fetchPokemon: typeof fetchPokemon
}

const PokemonListContainer: React.FC<IPokemonsListContainerProps> = (props) => {
  let pkmnListContainer = React.createRef<HTMLDivElement>();
  
  const [offset, setOffSet] = useState(0);
  const [limit] = useState(20);

  const fetchPokemonList = async () =>{
    const data = await props.fetchPokemon({offset, limit});
    setOffSet(limit + offset);
    console.log(data);
  }

  const handleScroll = debounce(() => {
    if (
      safeTraverse(pkmnListContainer, ['current','scrollHeight']) === safeTraverse(pkmnListContainer, ['current','scrollTop'])
      + safeTraverse(pkmnListContainer, ['current','offsetHeight'])
    ) {
      fetchPokemonList();
    }
  }, 100);

  useEffect(()=>{
    setOffSet(limit + offset);
    fetchPokemonList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const pokemons = safeTraverse(props,['pokemonsList', 'pokemons']) || []
  return (
    <div>
      {safeTraverse(props,['pokemonsList', 'asyncStatus']) && <div>Loading</div>}
      <div className="pkmn-list-container" onScroll={handleScroll} ref={pkmnListContainer}>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <div>
          {
            pokemons.map((item: Pokemon, index: number) => {
              return (
                <PokemonListItem key={index} pokemon={item} number={index + 1}/>
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

export default connect(mapStateToProps, {fetchPokemon})(PokemonListContainer);