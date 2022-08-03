import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musicName, playMusic } = this.props;
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: propTypes.string.isRequired,
  playMusic: propTypes.string.isRequired,
};

export default MusicCard;
