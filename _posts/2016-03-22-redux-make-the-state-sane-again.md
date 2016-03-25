---
title: Redux.js - Make the state sane again
updated: 2016-03-22 18:00
category: Redux.js
tweet: 712588476286373888
---

[Redux](http://redux.js.org/) is a framework that helps you sane your application states :heart_eyes:. It lets you write applications that behave consistently and predictable. Redux is basically a pattern for a single state container handling all your state changes by dispatching a state and later use a reducer to compute the state change. It's easy to recreate the same application state or even [timetravel](https://github.com/gaearon/redux-devtools) through state changes :sunglasses:.

Redux evolves the ideas of Flux. You can use Redux together with React, with anything-else.js or vanilla.js.

There are 3 main concepts to understand:

- **Store** holds the state and handles subscriptions. There is only 1 state store per application!
- **Actions** are payloads of information you send to the store to trigger a change to the state. They are plain javascript objects and must have a ```type``` property
- **Reducers** trigger on actions and actually apply the change in the state

## Current state of states

In current frontend applications, states, and their changes are spread across everything. Sometimes CSS classes are abused to represent a states, some others are implemented in javascript variables (god beware global ```window```). Oh and cookies. There is no way to get the whole picture.

The Redux pattern creates a layer between the state-change-trigger and the actual-action. This creates a very clear view of application states and behavior.

### User completes a Todo - example:

- Checkbox has **dom event handler**
- Event handler triggers
- **CSS class** is added to event.target.parentNode
- more spagettos

### User completes a Todo - Redux way:

- Todo List **subscribes** to state changes
- Checkbox has **dom event handler**
- Event handler **dispatches** a TODO_COMPLETED action with id in param to the store
- **Store** sends action through reducer tree
- Reducer for TODO_COMPLETED action **modifies affected Todo state**
- Todo List subscriber triggers update as the state is changed and **CSS class** is added

![Store passing actions to reducers](http://i.giphy.com/xztgj23fvzUyI.gif)

*A store passing actions to reducers.*

## Let's hack

Install redux via npm:

```sh
npm install --save redux
```

:guardsman: I use es6 in the example so bring your own es6.

- Playground [on github](https://github.com/k9ordon/redux-simple-example)

In our example, we'd like to select a list item by clicking it. The selected state will sow a border around the item.

```html
<!-- File: index.html -->

<div class="list">
    <h3>
        Your list:
    </h3>

    <ul class="list-wrap">
        <li class="item" data-id="123">yo</li>
        <li class="item" data-id="234">lo</li>
    </ul>
</div>
```

First things first we create our state store with the ```createStore``` function from redux. This function takes reducers as the first argument. As we heard before reducers have a single use: **Take a state and return the modified state.** As we have not implemented any reducers, we just create a dummy reducer returning the same state as passed in.

```js
// File: store.js

import { createStore } from 'redux'

let emptyReducer = (state, action) => return state;

export let store = createStore(emptyReducer)
```

Next, we define our **action**. As actions are plain JavaScript objects this might look a little too boilerplated but as your application grows this is a geat way to get an overview of all the actions that trigger state changes.

```js
// File: action.js

export const ITEM_SELECTED = 'ITEM_SELECTED'

export function item_selected(id) {
    return {
        type: ITEM_SELECTED,
        id: parseInt(id)
    }
}

```

Let's use this action by importing it (es6 ftw!).

```js
// File: main.js

import { store } from './store';
import { item_selected } from './action';

for (var $item of document.querySelectorAll('.item')) {
    $item.addEventListener('click', (e) => {
        e.preventDefault();
        store.dispatch(item_selected(e.target.dataset.id));
    });
}
```

In the click handler, we start a state change by dispatching the action object in the store. Nothing happens, except the reducers receive a dispatched action, which in our case just return the same state as before. Let's create a store which actually modifies a state.

```js
// File: reducer.js

import { ITEM_SELECTED } from './action';

export function Item_Reducer(state = [], action) {
    switch (action.type) {
        case ITEM_SELECTED:
            return Object.assign(state,
                {
                    Items: state.Items.map((item, index) => {
                        console.log(item.id === action.id, item.id, action.id);
                        return Object.assign(item, {
                            selected: (item.id === action.id ? true : false)
                        });
                    })
                }
            );
        default:
            return state;
    }
}
```

A Reducer function gets 2 Arguments from the store. First the current state and the action payload we created in the **action.js**. In the reducer decide mutation by ```action.type```. It's very important for to return a copy of the state. **Never modify the original state object.**

> It’s very important that the reducer stays pure. Things you should never do inside a reducer:
>
> - Mutate its arguments;
> - Perform side effects like API calls and routing transitions;
> - Calling non-pure functions, e.g. Date.now() or Math.random().

So we map a function to every ```Items``` child in state and return a copy with a patched ```{ selected: true}``` property if the item is the same as ```action.id```.

If we run this example again we got modified states after clicking an item.

Now we bind the reducer to our store. We replace emptyReducer with our real Item_Reducer and add an initial application state.

```js
// File: store.js

import { createStore } from 'redux';
import { Item_Reducer } from './reducer';

let initialState = {
    Items: [{ id: 123 }, { id: 234 }],
};

export let store = createStore(Item_Reducer, initialState);
```

Last part we need to do is let the UI react to the state changes. So we create an update function and add it as a store listener.

```js
// File: main.js

...
let update = function() {
    for (var item of store.getState().Items) {
        let $item = document.querySelector(`.item[data-id="${item.id}"]`);

        if(item.selected == true)
            $item.classList.add('item--selected');
        else
            $item.classList.remove('item--selected');
    }
};

store.subscribe(update);
...
```

Every time the state changed we run all functions subscribed to the store to reflect the new state in the interface.

That's all. :alien:

## Conclusio

After brainfuck is over and you understand wtf you are doing - it's a very clean and consistent pattern for modifying application states.

- Run my [example repo](https://github.com/k9ordon/redux-simple-example)
- Head over to the [official redux docs](http://redux.js.org/)!!!
