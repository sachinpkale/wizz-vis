/* jshint esversion: 6 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Controls from '../components/Controls';

import * as actions from '../actions/index';

const ControlsContainer = ({ actions, ...props }) => (
  <Controls {...{ actions, ...props }} />
);

ControlsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  reloadTimestamp: PropTypes.number,
  widgetsRange: PropTypes.string
};

function mapStateToProps(state) {
  return {
    reloadTimestamp: state.reloadTimestamp,
    widgetsRange: state.setRange
    // Component's prop_name: reducer_name set in index file.
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(ControlsContainer);
