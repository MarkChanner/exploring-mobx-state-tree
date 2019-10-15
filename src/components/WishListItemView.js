import React from 'react';
import { observer } from 'mobx-react';
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree';

import WishListItemEdit from './WishListItemEdit';

class WishListItemView extends React.Component {
  state = { isEditing: false };

  render() {
    const { item } = this.props;
    return this.state.isEditing ? (
      this.renderEditable()
    ) : (
      <li>
        {item.image && <img src={item.image} />}
        <h3>{item.name}</h3>
        <span>{item.price}</span>
        <span>
          <button onClick={this.onToggleEdit}>Edit</button>
          <button onClick={item.remove}>Remove</button>
        </span>
      </li>
    );
  }

  renderEditable() {
    return (
      <li>
        <WishListItemEdit item={this.state.clone} />
        <button onClick={this.onCancelEdit}>Cancel Edit</button>
        <button onClick={this.onSaveEdit}>Save Edit</button>
      </li>
    );
  }

  onToggleEdit = () => {
    this.setState({ isEditing: true, clone: clone(this.props.item) });
  };

  onCancelEdit = () => {
    this.setState({ isEditing: false });
  };

  onSaveEdit = () => {
    applySnapshot(this.props.item, getSnapshot(this.state.clone));
    this.setState({ isEditing: false });
  };
}

export default observer(WishListItemView);
