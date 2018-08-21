/* jshint esversion: 6 */

import * as actionTypes from '../constants/commonConstants';

export function updateReload(value) {
  return {
    type: actionTypes.DASHBOARD_RELOAD_UPDATE,
    value,
  };
}
