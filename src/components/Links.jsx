import React from 'react';
import { Link } from 'react-router-dom';

class Links extends React.Component {
  render() {
    return (
      <div>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </div>
    );
  }
}

export default Links;
