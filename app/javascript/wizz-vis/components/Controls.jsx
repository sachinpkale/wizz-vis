import PropTypes from 'prop-types';
import React from 'react';

export default class Controls extends React.Component {
  constructor(props){
    super(props);
    this.updateReload = this.updateReload.bind(this);
    this.setRange = this.setRange.bind(this);
  }

  updateReload() {
    this.props.actions.updateReload(Date.now());
  }

  setRange() {
    this.props.actions.updateRange('last_1_hour');
  }

  render() {
    return(
      <div>
        <a href="#" onClick={this.setRange}>
          last_1_hour
        </a>
        <a href="#" onClick={this.updateReload}>
          <i className="material-icons">autorenew</i>
        </a>
      </div>
    );
  }
}
