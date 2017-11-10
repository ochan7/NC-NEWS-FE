import {combineReducers} from 'redux';

import test from './test';
import articles from './articles';

const reducer = combineReducers({
  test, articles
});

export default reducer;
