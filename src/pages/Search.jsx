import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Album from '../components/Album';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    buttonDisabled: true,
    artistInputValue: '',
    artist: '',
    albums: [],
    loading: false,
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.buttonEnabled();
    });
  }

  buttonEnabled = () => {
    const { artistInputValue } = this.state;
    const minInputValue = 2;
    const enableButton = artistInputValue.length < minInputValue;
    this.setState({ buttonDisabled: enableButton });
  };

  searchSubmit = () => {
    const { artistInputValue } = this.state;
    this.setState({
      loading: true,
      artist: artistInputValue,
    }, async () => {
      const resposta = await searchAlbumsAPI(artistInputValue);
      this.setState({
        loading: false,
        artistInputValue: '',
        albums: resposta,
      });
    });
  }

  render() {
    const { artistInputValue, buttonDisabled, artist, albums, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        { loading ? (
          <Loading />
        ) : (
          <div>
            <form>
              <input
                type="text"
                name="artistInputValue"
                data-testid="search-artist-input"
                value={ artistInputValue }
                onChange={ this.onInputChange }
              />
              <button
                type="submit"
                name="searchButton"
                data-testid="search-artist-button"
                onClick={ this.searchSubmit }
                disabled={ buttonDisabled }
              >
                Pesquisar
              </button>
            </form>
            { albums.length === 0 ? (
              <p>Nenhum álbum foi encontrado</p>
            ) : (
              <p>
                Resultado de álbuns de:
                {' '}
                { artist }
              </p>
            )}
            {albums.map(({ artistName, artworkUrl100, collectionId, collectionName }) => (
              <Album
                key={ collectionId }
                name={ artistName }
                image={ artworkUrl100 }
                albumId={ collectionId }
                albumName={ collectionName }
              />))}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
