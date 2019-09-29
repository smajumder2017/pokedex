import React from 'react';
import pokeballImage from './../../assets/pokeball.svg';

import './styles.scss';
export const Loader: React.FC = () => {
  return (
    <div>
      <div className="loader-image-container" />
      <img
        alt=""
        src={pokeballImage}
        width="30"
        height="30"
        className="loader-image"
      />
    </div>
  );
}