/* jshint esversion: 6 */

import * as actionTypes from '../constants';

const initialState = null;

// Why name function the same as the reducer?
// https://github.com/gaearon/redux/issues/428#issuecomment-129223274
// Naming the function will help with debugging!
export default function rangeReducer(state = initialState, action) {
  const { type, value } = action;
  switch (type) {
    case actionTypes.DASHBOARD_SET_RANGE:
      return value; // 'last_1_hour'
      // You could also return an object with lastActionType in case Dashboard.jsx needs it.
      // ==>  return { lastActionType: type, value };
      // const initialState = { lastActionType: null, value: null }
    default:
      return state;
  }
}
