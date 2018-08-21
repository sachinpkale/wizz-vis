/* jshint esversion: 6 */

import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { AppContainer } from "react-hot-loader";
import { render } from "react-dom";

import ReloadContainer from '../containers/ReloadContainer';

/*
*  Export a function that returns a ReactComponent, depending on a store named SharedReduxStore.
*  This is used for the client rendering hook after the page html is rendered.
*  React will see that the state is the same and not do anything.
*/
export default (props, reloadTimestamp, domNodeId) => {
 // This is where we get the existing store.
 const store = ReactOnRails.getStore('SharedReduxStore');

 // renderApp is a function required for hot reloading. see
 // https://github.com/retroalgic/react-on-rails-hot-minimal/blob/master/client/src/entry.js

 // Provider uses this.props.children, so we're not typical React syntax.
 // This allows redux to add additional props to the HelloWorldContainer.
 const renderApp = (Komponent) => {
   const element = (
     <AppContainer>
       <Provider store={store}>
         <Komponent />
       </Provider>
     </AppContainer>
   )
   render(element, document.getElementById(domNodeId));
 }

 renderApp(ReloadContainer);

 if (module.hot) {
   module.hot.accept(['../containers/ReloadContainer'], () => {
     renderApp(ReloadContainer);
   })
 }
};
