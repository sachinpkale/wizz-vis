/* jshint esversion: 6 */

import commonReducer from './common';
import * as actionTypes from '../constants';

const initialState = null;

// Name function the same as the reducer for debugging.
export default function rangeReducer(state = initialState, action) {
  return commonReducer.init(
    state, action, actionTypes.DASHBOARD_SET_RANGE
  );
}
