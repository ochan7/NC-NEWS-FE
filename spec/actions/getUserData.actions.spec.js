import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {API_URL} from '../../config';
const mockStore = configureMockStore([thunk]);

import getUserData, {
  getUserDataRequest, getUserDataSuccess
} from '../../src/actions/getUserData';

describe('getUserData', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('dispatches GET_USER_DATA_SUCCESS when getting user by username and responds with 200 and data', () => {
    const username = 'tickle122';
    const data = {
      articles: [1],
      comments: [1]
    };
    nock(API_URL)
      .get(`/users/${username}/repos`)
      .reply(200, data);
    
    const expectedActions = [
      getUserDataRequest(username),
      getUserDataSuccess(data)
    ];

    const store = mockStore();

    return store.dispatch(getUserData(username))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });

  });
});

