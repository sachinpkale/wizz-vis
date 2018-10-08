/* jshint esversion: 6 */

import * as actionTypes from '../constants';
import commonReducer from './common';

const initialState = null;

// Why name function the same as the reducer?
// https://github.com/gaearon/redux/issues/428#issuecomment-129223274
export default function reloadReducer(state = initialState, action) {
  return commonReducer.init(
    state, action, actionTypes.DASHBOARD_RELOAD_UPDATE
  );
}
