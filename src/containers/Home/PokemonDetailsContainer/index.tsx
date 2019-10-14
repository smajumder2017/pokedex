import React, { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';

import AppState from './../../../models/state';
import { PokemonDetails, PokemonSpecise } from './../../../models/pokemonDetails';
import { fetchPokemonDetails, fetchPokemonDescription } from './../../../redux/actions/pokemonDetailsActions';
import SelectedPokemonSelector from './../../../selectors/selectedPokemonDetails';
import SelectedPokemonDetails from './../../../selectors/selectedPokemonDescription';

import './styles.scss';
import { Loader } from '../../../components/Loader';

interface IPokemonDetailsContainerProps {
  asyncStatus: Boolean,
  selectedPokemon: number | null,
  pokemonDetails: PokemonDetails,
  fetchPokemonDetails: typeof fetchPokemonDetails,
  fetchPokemonDescription: typeof fetchPokemonDescription,
  pokemonSpecise: PokemonSpecise 
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
    const type1 = _.filter(props.pokemonDetails.types, (type) => type.slot === 1)[0];
    const types = props.pokemonDetails.types.sort((type1, type2)=>{
      return type1.slot - type2.slot;
    })
    const abilities = props.pokemonDetails.abilities.sort((abl1, abl2) => {
      return abl1.slot - abl2.slot;
    })
    return (
      <div>
        <div className={`pokemon-image-container`}>
          <div className={`cover-${type1.type.name}`} />
          <div className={`pokeinfo`} >
            <Container fluid>
              <Row>
                <Col sm={3}>
                  <div className="poke-image-backdrop">
                    <img
                      alt=""
                      src={require(`./../../../assets/pokemons/${props.selectedPokemon}.svg`)}
                      width="250"
                      height="250"
                    />
                  </div>
                </Col>
                <Col sm={9}>
                  <div className="poke-details-basic-container">
                    <Container>
                      <Row>
                        <Col sm={6}>
                          <div className="poke-details-basic">
                            <div className="name">{`#${props.pokemonDetails.id} ${props.pokemonDetails.name.toUpperCase()}`}</div>
                            <div className="types">
                              <b>TYPE: </b>
                              {
                                types.map((type, index)=>{
                                  return(
                                    <span className={`type-${type.type.name}`}key={index}>{type.type.name}</span>
                                  );
                                })
                              }
                            </div> 
                            <div className="dimension">
                              <div className='dimension-item'><b>HEIGHT: </b>{(props.pokemonDetails.height *  0.1).toFixed(2)} m</div>
                              <div className='dimension-item'><b>WEIGHT: </b>{(props.pokemonDetails.weight * 0.1).toFixed(2)} kgs</div>
                            </div>
                            <div className="abilities">
                            <b>ABILITIES: </b>
                              {
                                abilities.map((ability, index) => {
                                  return <span key={index}>{`${ability.ability.name}${ability.is_hidden ? ` (hidden)`: ``}`}</span>
                                })
                              }
                            </div>
                          </div>
                        </Col>
                        <Col sm={6}>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    )
  } else {
    return <div>
      {
        props.asyncStatus && <Loader />
      }
    </div>
  }

}

const mapStateToProps = (state: AppState) => ({
  selectedPokemon: state.pokemonsList.selected,
  asyncStatus: state.pokemonDetails.asyncStatus,
  pokemonDetails: SelectedPokemonSelector(state),
  pokemonSpecise: SelectedPokemonDetails(state)
})

export default connect(mapStateToProps, { fetchPokemonDetails, fetchPokemonDescription })(PokemonDetailsConatiner);