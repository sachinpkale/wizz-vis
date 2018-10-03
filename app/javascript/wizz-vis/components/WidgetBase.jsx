/* jshint esversion: 6 */

import React from 'react';
import { connect } from 'react-redux';
import { ResponsiveContainer } from 'recharts';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import cs from 'classnames';

import WidgetTitle from './widgets/WidgetTitle';
import WidgetSerie from './widgets/WidgetSerie';
import WidgetBar from './widgets/WidgetBar';
import WidgetPie from './widgets/WidgetPie';
import WidgetValue from './widgets/WidgetValue';
import WidgetLocation from './widgets/WidgetLocation';
import WidgetHeatmap from './widgets/WidgetHeatmap';
import WidgetTable from './widgets/WidgetTable';
import WidgetPlane from './widgets/WidgetPlane';
import WidgetPlaneLocation from './widgets/WidgetPlaneLocation';
import WidgetPlaneRoute from './widgets/WidgetPlaneRoute';
import WidgetChord from './widgets/WidgetChord';
import WidgetSankey from './widgets/WidgetSankey';
import WidgetMultiserie from './widgets/WidgetMultiserie';
import WidgetImage from './widgets/WidgetImage';
import WidgetRoute from './widgets/WidgetRoute';
import WidgetHistogram from './widgets/WidgetHistogram';
import WidgetText from './widgets/WidgetText';

import Errors from './../utils/errors';

import PropTypes from 'prop-types';

const components = {
  WidgetSerie,
  WidgetBar,
  WidgetPie,
  WidgetValue,
  WidgetLocation,
  WidgetHeatmap,
  WidgetTable,
  WidgetPlane,
  WidgetPlaneLocation,
  WidgetPlaneRoute,
  WidgetChord,
  WidgetSankey,
  WidgetMultiserie,
  WidgetImage,
  WidgetRoute,
  WidgetHistogram,
  WidgetText
};

class WidgetBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      $$data: [],
      attributes: {},
      error: null,
      reloadTimestamp: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let state_values = {};
    if (nextProps.reloadTimestamp !== prevState.reloadTimestamp)
      state_values.reloadTimestamp = nextProps.reloadTimestamp;

    if (nextProps.range !== prevState.range)
      state_values.range = nextProps.range;

    // No state update necessary
    if(isEmpty(state_values))
      return null;

    // Updates reloadTimestamp/range states if necessary.
    return state_values;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.reloadTimestamp !== prevProps.reloadTimestamp ||
        this.state.range !== prevProps.range) {
      this.fetchData();
    }
  }

  fetchData() {
    let button = $('.preloader-wrapper[widget_id="' + this.props.id + '"]');
    button.addClass('active');
    return (
      fetch('/widgets/' + this.props.id + '/data.json?range=' + (this.state.range || ''))
        .then(response => Errors.handleErrors(response))
        .then(widget => {
          if(widget.data && JSON.stringify(widget.data) !== JSON.stringify(this.state.$$data) ||
            JSON.stringify(widget.attributes) !== JSON.stringify(this.state.attributes)) {
            this.setState({
              $$data: widget.data,
              attributes: widget.attributes,
              error: null
            });
          }
        })
        .then(data => button.removeClass('active'))
        .catch(error => {
          button.removeClass('active');
          if(JSON.stringify(error.error) !== JSON.stringify(this.state.error)) {
            this.setState({ $$data: [], error: error.error });
          }
        })
    );
  }

  /*
   * Remove a widget (by id).
   */
  removeWidget () {
    if (!window.confirm('Are you sure you wish to delete this widget?'))
      return false;

    fetch(
      '/widgets/' + this.props.id + '.json',
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': ReactOnRails.authenticityToken()
        },
        credentials: 'same-origin'
      }
    )
    .then(response => this.props.remove())
    .catch(error => this.setState({ error: error }));
  }

  contentHeight () {
    if (this.refs.content !== undefined)
      return this.refs.content.clientHeight
  }

  contentWidth () {
    if (this.refs.content !== undefined)
      return this.refs.content.clientWidth
  }

  background (property) {
    return get(this.props.options.background, property);
  }

  render () {
    const Type = components[this.props.type || 'WidgetSerie'];
    const color = this.background('color');

    const style = {
      backgroundColor: color == 'transparent' ? null : color
    };

    const cssClass = cs(
      'widget center-align',
      {
        'transparent-bg': color == 'transparent'
      }
    );

    return (
      <div className = { cssClass } style = { style }>
        <WidgetTitle
          widget_id={this.props.id}
          title={this.props.title}
          links={this.props.options.links}
          locked={this.props.locked}
          remove={this.removeWidget.bind(this)}
        />
        <div className='widget-content' ref='content'>
          { this.background('image') ?
              <WidgetImage
                image = { this.background('image') }
                opacity = { this.background('opacity') }
              /> : null
          }
          <Type {...this.props} {...this.state.attributes}
            data={this.state.$$data} error={this.state.error}
            height={this.contentHeight()}
            width={this.contentWidth()} />
        </div>
      </div>
    )
  }
};

WidgetBase.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  options: PropTypes.object,
  locked: PropTypes.bool.isRequired,
  reloadTimestamp: PropTypes.number,
  remove: PropTypes.func,
  type: PropTypes.oneOf(Object.keys(components)),
  range: PropTypes.string
};

function mapStateToProps(state) {
  return {
    range: state.setRange,
    reloadTimestamp: state.reloadTimestamp
  };
}

export default connect(mapStateToProps)(WidgetBase);
