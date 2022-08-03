import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Album extends Component {
  render() {
    const { image, name, albumId, albumName } = this.props;
    return (
      <div className="Album">
        <Link to={ `/album/${albumId}` }>
          <img src={ image } alt={ name } data-testid={ `link-to-album-${albumId}` } />
          <h1>{ name }</h1>
          <h1>{ albumName }</h1>
        </Link>
      </div>
    );
  }
}

Album.propTypes = {
  image: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  albumId: propTypes.string.isRequired,
  albumName: propTypes.string.isRequired,
};

export default Album;
