import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initalState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
  initalState,
  composeEnhancers(applyMiddleware(...middleware))
  );
// const store = createStore(rootReducer, initalState, compose(
//     applyMiddleware(...middleware),
//     window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
// ));

export default store;