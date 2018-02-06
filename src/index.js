import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import exampleReducer from './reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const INITIAL_STATE = {
    layout: [
        { x: 0, y: 0, h: 2, w: 5, i: "0", moved: false, "static": false },
        { x: 5, y: 0, h: 2, w: 3, i: "1", moved: false, "static": false },
        { x: 0, y: 2, w: 12, h: 2, i: "2", moved: false, "static": false }
    ]
};

const store = createStore(
    exampleReducer,
    INITIAL_STATE,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();