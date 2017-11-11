import {combineReducers} from 'redux';

import test from './test';
import getArticles from './getArticles';
import getArticlesByTopic from './getArticlesByTopic';
import getComments from './getComments';
import getTopics from './getTopics';
const reducer = combineReducers({
  test, getArticles, getArticlesByTopic, getComments, getTopics
});

export default reducer;
