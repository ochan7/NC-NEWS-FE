import {combineReducers} from 'redux';

import test from './test';
import getArticles from './getArticles';
import getArticlesByTopic from './getArticlesByTopic';
import getComments from './getComments';
import getTopics from './getTopics';
import postComment from './postComment';
import getUser from './getUser';

const reducer = combineReducers({
  test, getArticles, getArticlesByTopic, getComments, getTopics, postComment, getUser
});

export default reducer;
