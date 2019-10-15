import { getSnapshot } from 'mobx-state-tree';
import { WishListItem, WishList } from './WishList';

describe('a WishListItem', () => {
  it('can create an instance of a model', () => {
    const item = WishListItem.create({
      name: 'Chronicles of Narnia Box Sert - CS Lewis',
      price: 28.73
    });

    expect(item.price).toBe(28.73);
    expect(item.image).toBe('');
  });

  it('can change the values of a wishlist', () => {
    const item = WishListItem.create({
      name: 'Chronicles of Narnia Box Sert - CS Lewis',
      price: 28.73
    });
    item.changeName('Lord of the Rings');
    item.changePrice(30.0);
    item.changeImage('https://images-na.ssl-images-amazon.com/images');

    expect(item.name).toBe('Lord of the Rings');
    expect(item.price).toBe(30.0);
    expect(item.image).toBe('https://images-na.ssl-images-amazon.com/images');
  });
});

describe('a WishList', () => {
  it('can create an instance of a model', () => {
    const list = WishList.create({
      items: [
        {
          name: 'Chronicles of Narnia Box Sert - CS Lewis',
          price: 28.73
        }
      ]
    });
    expect(list.items.length).toBe(1);
    expect(list.items[0].price).toBe(28.73);
  });

  it('can add an item', () => {
    const list = WishList.create({
      items: [
        {
          name: 'Chronicles of Narnia Box Sert - CS Lewis',
          price: 28.73
        }
      ]
    });
    list.add({
      name: 'Star Wars',
      price: 25.0
    });
    expect(list.items.length).toBe(2);
    expect(list.items[1].name).toBe('Star Wars');
  });
});

describe('just trying out MST getSnapshot', () => {
  const list = WishList.create({
    items: [
      {
        name: 'Chronicles of Narnia Box Sert - CS Lewis',
        price: 28.73
      },
      {
        name: 'Dracula',
        price: 9.99
      }
    ]
  });

  expect(getSnapshot(list)).toEqual({
    items: [
      {
        name: 'Chronicles of Narnia Box Sert - CS Lewis',
        price: 28.73,
        image: ''
      },
      {
        name: 'Dracula',
        price: 9.99,
        image: ''
      }
    ]
  });

  expect(getSnapshot(list)).toMatchSnapshot();

  it('can calculate the total price of a wishlist', () => {
    expect(list.totalPrice).toBe(38.72);
  });
});
