/* jshint esversion: 6 */

import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { render } from "react-dom";

import DashboardContainer from '../containers/DashboardContainer';

/*
*  Export a function that returns a ReactComponent, depending on a store named SharedReduxStore.
*  This is used for the client rendering hook after the page html is rendered.
*  React will see that the state is the same and not do anything.
*/
export default (props, railsContext, domNodeId) => {
  // This is where we get the existing store.
  const store = ReactOnRails.getStore('SharedReduxStore');

  // renderApp is a function required for hot reloading. see
  // https://github.com/retroalgic/react-on-rails-hot-minimal/blob/master/client/src/entry.js

  // Provider uses this.props.children, so we're not typical React syntax.
  // This allows redux to add additional props to the DashboardContainer.
  const renderApp = (Komponent) => {
   const element = (
     <Provider store={store}>
       <Komponent  {...props} />
     </Provider>
   )
   render(element, document.getElementById(domNodeId));
  }

  renderApp(DashboardContainer);
};
