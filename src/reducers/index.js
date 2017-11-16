import {combineReducers} from 'redux';

import test from './test';
import getArticles from './getArticles';
import getArticlesByTopic from './getArticlesByTopic';
import getComments from './getComments';
import getTopics from './getTopics';
import postComment from './postComment';
import getUser from './getUser';
import putArticle from './putArticle';
import putComment from './putComment';
import getArticle from './getArticle';
import deleteComment from './deleteComment';
const reducer = combineReducers({
  test, 
  getArticles, 
  getArticle,
  getArticlesByTopic, 
  getComments, 
  getTopics, 
  postComment, 
  getUser,
  putArticle,
  putComment,
  deleteComment
});

export default reducer;
