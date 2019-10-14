import React from 'react';
import { Row, Col } from 'react-bootstrap'

import { Pokemon } from './../../models/pokemonsList';

import {safeTraverse}  from './../../utils/helpers'
import './styles.scss'

interface IPokemonListItemProps {
  pokemon: Pokemon
  number: number,
  selected: Boolean,
  handleSelect: ()=> void
}
export const PokemonListItem: React.FC<IPokemonListItemProps> = (props) => {
  return (
    <div className={props.selected ? `pokemon-list-item selected` : `pokemon-list-item`} onClick={props.handleSelect}>
      <Row noGutters>
        <Col sm={2}>
          <div className={props.selected ? `pokemon-list-image-container selected` : `pokemon-list-image-container`}>
            <img
              alt=""
              src={require(`./../../assets/pokemons/${props.number}.svg`)}
              width="35"
              height="35"
              className="d-inline-block align-top"
            />
          </div>
        </Col>
        <Col sm={10}>
          <div className={props.selected ? `pokemon-list-name-container selected` : `pokemon-list-name-container`}>
            <div className="pokemon-item-name">
              {`# ${props.number} ${safeTraverse(props, ['pokemon', 'name']).toUpperCase()}`}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}