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

  setRange(event) {
    this.props.actions.updateRange(event.target.value);
  }

  render() {
    return(
      <ul>
        <li>
          <a href="#" onClick={ this.updateReload }>
            <i className="material-icons">autorenew</i>
          </a>
        </li>
        <li>
          <select
            className='browser-default'
            value={ this.props.widgetsRange }
            onChange={ this.setRange }
            style={{ backgroundColor: '#f68d2e', border: 'none', height: '64px', lineHeight: '64px' }}>
            <option value=''>None</option>
            <option value='last_30_minutes'>Last 30 minutes</option>
            <option value='last_1_hour'>Last 1 hour</option>
            <option value='last_6_hours'>Last 6 hours</option>
            <option value='last_1_day'>Last 1 day</option>
            <option value='last_7_days'>Last 7 days</option>
            <option value='last_30_days'>Last 30 days</option>
          </select>
        </li>
      </ul>
    );
  }
}
