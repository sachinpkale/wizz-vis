import PropTypes from 'prop-types';
import React from 'react';

export default class Reload extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.actions.updateReload(Date.now());
  }

  render() {
    return(
      <a href="#" onClick={this.handleClick}>
        <i className="material-icons">autorenew</i>
      </a>
    );
  }
}
