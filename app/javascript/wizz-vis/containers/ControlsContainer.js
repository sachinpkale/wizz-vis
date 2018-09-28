/* jshint esversion: 6 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Controls from '../components/Controls';

import * as actions from '../actions/index';

const ControlsContainer = ({ actions }) => (
  <Controls {...{ actions }} />
);

ControlsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  reloadTimestamp: PropTypes.number
};

function mapStateToProps(state) {
  return {
    reloadTimestamp: state.reloadTimestamp
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

// Don't forget to actually use connect!
export default connect(mapStateToProps, mapDispatchToProps)(ControlsContainer);
