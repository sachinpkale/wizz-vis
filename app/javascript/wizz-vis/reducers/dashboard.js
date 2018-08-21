/* jshint esversion: 6 */

import * as actionTypes from '../constants/commonConstants';

const initialState = {
  lastActionType: null,
  value: null,
};

// Why name function the same as the reducer?
// https://github.com/gaearon/redux/issues/428#issuecomment-129223274
// Naming the function will help with debugging!
export default function dashboardReducer(state = initialState, action) {
  const { type, value } = action;
  switch (type) {
    case actionTypes.DASHBOARD_RELOAD_UPDATE:
      return {
        lastActionType: type,
        value,
      };
    default:
      return state;
  }
}
