import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {API_URL} from '../config';
const mockStore = configureMockStore([thunk]);

import getUser, {
  getUserFailure, getUserRequest, getUserSuccess
} from '../src/actions/getUser';

describe('getUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('dispatches GET_USER_SUCCESS when getting user by username and responds with 200 and data', () => {
    const username = 'tickle122';
    const users = [
      {
        '_id': '5a033990e03644b9fab52893',
        'username': 'tickle122',
        'name': 'Tom Tickle',
        'avatar_url': 'http://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
        '__v': 0
      }
    ];
    nock(API_URL)
      .get(`/users/${username}`)
      .reply(200, {users});
    
    const expectedActions = [
      getUserRequest(username),
      getUserSuccess(users)
    ];

    const store = mockStore();

    return store.dispatch(getUser(username))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });

  });
  it('dispatched GET_USER_FAILURE when getting user and responds with an error', () => {
    const wrong_username = 'adsfasdf';
    const error = 'USERNAME NOT FOUND';
    nock(API_URL)
      .get(`/users/${wrong_username}`)
      .replyWithError({'message': error});
    
    const expectedActions = [
      getUserRequest(wrong_username),
      getUserFailure(error)
    ];

    const store = mockStore();
    
    return store.dispatch(getUser(wrong_username))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});

