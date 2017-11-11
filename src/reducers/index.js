import {combineReducers} from 'redux';

import test from './test';
import articles from './articles';
import articlesByTopic from './articlesByTopic';
import comments from './comments';
import topics from './topics';
const reducer = combineReducers({
  test, articles, articlesByTopic, comments, topics
});

export default reducer;
