import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    songs: [],
    album: [],
    loading: false,
    favorites: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      songs: response,
      album: response[0],
    });
  }

  favoriteSubmit = async ({ target }) => {
    const { id } = target;
    const { favorites } = this.state;
    this.setState({
      loading: true,
    });
    const response = await getMusics(id);
    console.log(response.map((a) => a.trackId)[0]);
    await addSong(response[1]);
    this.setState({
      loading: false,
      favorites: [...favorites, response.map((music) => music.trackId)[0]],
    });
  };

  render() {
    const { songs, album, loading, favorites } = this.state;
    return (
      <div data-testid="page-album">
        Album
        <Header />
        <p data-testid="artist-name">{ album.artistName }</p>
        <p data-testid="album-name">{ album.collectionName}</p>
        {loading ? <Loading />
          : songs.filter((song) => song.kind === 'song')
            .map(({ trackName, trackId, previewUrl }) => (
              <MusicCard
                key={ trackId }
                musicName={ trackName }
                playMusic={ previewUrl }
                trackId={ trackId }
                checkboxValue={ favorites.some((musicId) => musicId === trackId) }
                favoriteSubmit={ this.favoriteSubmit }
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
