import React from 'react';
import { observer } from 'mobx-react';

class WishListItemEdit extends React.Component {
  onNameChange = e => {
    this.props.item.changeName(e.target.value);
  };

  onPriceChange = e => {
    const price = Number.parseInt(e.target.value);
    if (!Number.isNaN(price)) this.props.item.changePrice(price);
  };

  onImageChange = e => {
    this.props.item.changeImage(e.target.value);
  };

  render() {
    const { item } = this.props;
    return (
      <div>
        Thing: <input value={item.name} onChange={this.onNameChange} />
        <br />
        Price: <input value={item.price} onChange={this.onPriceChange} />
        <br />
        Image: <input value={item.image} onChange={this.onImageChange} />
        <br />
      </div>
    );
  }
}

export default observer(WishListItemEdit);
