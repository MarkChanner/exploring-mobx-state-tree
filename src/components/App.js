import React from 'react';
import WishListView from './WishListView';

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>WishList</h1>
        </header>
        <WishListView wishList={this.props.wishList} />
      </div>
    );
  }
}

export default App;
