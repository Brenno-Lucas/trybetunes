import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    songs: [],
    album: [],
    loading: false,
    favorites: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response2 = await getFavoriteSongs();
    const [artistAlbum, ...response] = await getMusics(id);
    this.setState({
      songs: response,
      album: artistAlbum,
      favorites: response2,
    });
  }

  favoriteSubmit = async (param) => {
    const { favorites } = this.state;
    this.setState({
      loading: true,
    });
    console.log();
    await addSong(param);
    this.setState({
      loading: false,
      favorites: [...favorites, param],
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
          : songs
            .map((track) => (
              <MusicCard
                musicName="gosto"
                key={ track.trackId }
                song={ track }
                checkboxValue={ favorites.some((item) => item.trackId === track.trackId) }
                onChange={ this.favoriteSubmit }
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
