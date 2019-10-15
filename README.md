# Playing with MobX state tree (MST)

## Installation
`npm install`  
`npm start`  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  

This repo is based on Michael Weststrate's [Egghead][egghead] tutorial. 

[egghead]: https://egghead.io/lessons/react-describe-your-application-domain-using-mobx-state-tree-mst-models

## Notes  
`models/WishList.js` defines the WishList and WishListItem models which are instantiated in `index.js` and passed into the 
React App's WishListView component. The WishList model is defined as follows:   

```
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
```

### Models
Models are the core of MST as they describe the shape of the app state and perform type validation.  

### Actions
Actions are attached to the models to define behaviour. They can make use of the methods exposed by MST,
such as destroy, which removes a model element from the state tree. A full list of methods can be 
found [here][https://github.com/mobxjs/mobx-state-tree/blob/master/docs/API/README.md].  

### Views
Views without arguments such as that used on the WishList model are a computed field. They create an explicit 
caching point that MobX based reaction like @observer components can react to.

### Observer  
By using the observer wrapper from the 'mobx-react' package, React components automatically react to any 
relevant updates of the rendered models. This is declared as follows at the bottom of the WishListView:
`export default observer(WishListView);`  
