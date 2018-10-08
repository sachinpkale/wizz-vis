/* jshint esversion: 6 */

import DashboardContainer from '../containers/DashboardContainer';
import startup from './index';

/*
*  Initialize the Dashboard component, depending on a common store.
*/
export default (props, railsContext, domNodeId) => {
  startup.init(DashboardContainer, props, domNodeId);
};
