import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musicName, playMusic, trackId, onChange, checkboxValue } = this.props;
    return (
      <div className="Album">
        <p>{ musicName }</p>
        <audio data-testid="audio-component" src={ playMusic } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>
            audio
          </code>
          .
        </audio>
        <label htmlFor="favorite-song">
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checkboxValue }
            onChange={ onChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: propTypes.string.isRequired,
  playMusic: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired,
  checkboxValue: propTypes.bool.isRequired,
};

export default MusicCard;
