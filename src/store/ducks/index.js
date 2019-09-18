import { combineReducers } from 'redux';
import { reducer as product } from './products';

const reducers = combineReducers({
  product
});

export default reducers;
