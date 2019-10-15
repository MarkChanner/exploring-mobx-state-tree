import React from 'react';
import ReactDOM from 'react-dom';
import { getSnapshot } from 'mobx-state-tree';

import App from './components/App';
import { WishList } from './models/WishList';

let initialState = {
  items: [
    {
      name: 'Chronicles of Narnia Box Sert - CS Lewis',
      price: 28.73
    },
    {
      name: 'Star Wars',
      price: 17.0
    }
  ]
};

let wishList = WishList.create(initialState);
function renderApp() {
  ReactDOM.render(<App wishList={wishList} />, document.querySelector('#root'));
}

renderApp();

if (module.hot) {
  module.hot.accept(['./components/App'], () => {
    // new components
    renderApp();
  });

  module.hot.accept(['./models/WishList'], () => {
    // new model definitions
    const snapshot = getSnapshot(wishList);
    wishList = WishList.create(snapshot);
    renderApp();
  });
}
