import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artistInputValue: '',
    buttonDisabled: true,
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

  render() {
    const { artistInputValue, buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
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
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
