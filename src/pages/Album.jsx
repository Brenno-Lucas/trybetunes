import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    songs: [],
    album: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      songs: response,
      album: response[0],
    });
  }

  render() {
    const { songs, album } = this.state;
    return (
      <div data-testid="page-album">
        Album
        <Header />
        <p data-testid="artist-name">{ album.artistName }</p>
        <p data-testid="album-name">{ album.collectionName}</p>
        {songs.filter((song) => song.kind === 'song')
          .map(({ trackName, trackId, previewUrl }) => (
            <MusicCard
              key={ trackId }
              musicName={ trackName }
              playMusic={ previewUrl }
            />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
