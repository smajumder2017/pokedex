import React from 'react';
import { Row, Col } from 'react-bootstrap'

import { Pokemon } from './../../models/pokemonsList';

import {safeTraverse}  from './../../utils/helpers'
import './styles.scss'

interface IPokemonListItemProps {
  pokemon: Pokemon
  number: number
}
export const PokemonListItem: React.FC<IPokemonListItemProps> = (props) => {
  return (
    <div className="pokemon-list-item">
      <Row noGutters>
        <Col sm={2}>
          <div className="pokemon-list-image-container">
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
          <div className="pokemon-list-name-container">
            <div className="pokemon-item-name">
              {`# ${props.number} ${safeTraverse(props, ['pokemon', 'name']).toUpperCase()}`}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}