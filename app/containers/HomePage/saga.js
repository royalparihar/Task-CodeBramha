/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const requestURL = 'http://www.randomtext.me/api/';

  try {
    // Call our request helper (see 'utils/request')
    const { text_out: textOut } = yield call(request, requestURL);
    yield put(reposLoaded(textOut));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
}
