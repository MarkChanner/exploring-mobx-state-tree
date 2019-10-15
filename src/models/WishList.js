import { types, getParent, destroy } from 'mobx-state-tree';

export const WishListItem = types
  .model({
    name: types.string,
    price: types.number,
    image: '' // shortcut for: types.optional(types.string, '')
  })
  .actions(self => {
    function changeName(newName) {
      self.name = newName;
    }
    function changePrice(newPrice) {
      self.price = newPrice;
    }
    function changeImage(newImage) {
      self.image = newImage;
    }
    function remove() {
      getParent(self, 2).remove(self);
    }
    return {
      changeName,
      changePrice,
      changeImage,
      remove
    };
  });

export const WishList = types
  .model({
    items: types.optional(types.array(WishListItem), [])
  })
  .actions(self => {
    function add(newItem) {
      self.items.push(newItem);
    }
    function remove(item) {
      destroy(item);
    }
    return {
      add,
      remove
    };
  })
  .views(self => ({
    get totalPrice() {
      return self.items.reduce((sum, entry) => sum + entry.price, 0);
    }
  }));
