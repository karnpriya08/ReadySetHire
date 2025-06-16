import { legacy_createStore as createStore , applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers'
import { composeWithDevTools } from '@redux-devtools/extension';

// passing values to store as rootreducer
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;