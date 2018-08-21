/* jshint esversion: 6 */

import { combineReducers, applyMiddleware, createStore } from 'redux';
import middleware from 'redux-thunk';

import reducers from '../reducers/index';

/*
 *  Export a function that takes the props and returns a Redux store
 *  This is used so that 2 components can have the same store.
 */
export default (props, reloadTimestamp) => {
  const combinedReducer = combineReducers(reducers);
  const newProps = { ...props, reloadTimestamp };
  return applyMiddleware(middleware)(createStore)(combinedReducer, newProps);
};
