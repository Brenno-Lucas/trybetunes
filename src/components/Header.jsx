import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Links from './Links';

class Header extends React.Component {
  state = {
    nameUser: '',
  }

  componentDidMount = async () => {
    const getName = await getUser();
    this.setState({
      nameUser: getName.name,
    });
    return getName.name;
  };

  render() {
    const { nameUser } = this.state;
    return (
      <header data-testid="header-component">
        { nameUser === '' ? (
          <Loading />
        ) : (
          <div>
            <p data-testid="header-user-name">
              { nameUser }
            </p>
            <Links />
          </div>
        )}
      </header>
    );
  }
}

export default Header;
