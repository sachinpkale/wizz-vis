/* jshint esversion: 6 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Reload from '../components/Reload';

import * as actions from '../actions/index';

const ReloadContainer = ({ actions, reloadTimestamp }) => (
  <Reload {...{ actions, reloadTimestamp }} />
);
ReloadContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  reloadTimestamp: PropTypes.object.isRequired
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
export default connect(mapStateToProps, mapDispatchToProps)(ReloadContainer);
