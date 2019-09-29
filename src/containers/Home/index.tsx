import React from 'react';
import {Row, Col} from 'react-bootstrap';

import PokemonListContainer from './PokemonListContainer';
import PokemonDetailsContainer from './PokemonDetailsContainer';

import './styles.scss';

const Home : React.FC = () => {
    return (
        <div className="home">
            <Row noGutters>
                <Col sm={2}>
                    <PokemonListContainer />
                </Col>
                <Col sm={10}>
                    <PokemonDetailsContainer />
                </Col>
            </Row>
        </div>
    );
}

export default Home;