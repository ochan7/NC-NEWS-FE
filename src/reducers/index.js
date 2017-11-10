import {combineReducers} from 'redux';

import test from './test';
import articles from './articles';
import articlesByTopic from './articlesByTopic';
const reducer = combineReducers({
  test, articles, articlesByTopic
});

export default reducer;
