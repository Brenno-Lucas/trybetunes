import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { onChange, checkboxValue, song } = this.props;
    const { trackName, previewUrl, trackId } = song;
    return (
      <div className="Album">
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
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
            name="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checkboxValue }
            onChange={ () => onChange(song) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  onChange: propTypes.func.isRequired,
  checkboxValue: propTypes.bool.isRequired,
  song: propTypes.shape({
    trackName: propTypes.string.isRequired,
    previewUrl: propTypes.string.isRequired,
    trackId: propTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
