/* jshint esversion: 6 */

import startup from './index';
import ControlsContainer from '../containers/ControlsContainer';

/*
*  Initialize the Controls component, depending on a common store.
*/
export default (props, railsContext, domNodeId) => {
  startup.init(ControlsContainer, props, domNodeId);
};
