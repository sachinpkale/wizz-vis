/* jshint esversion: 6 */

import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
         Tooltip, Legend, ReferenceLine, Label } from 'recharts';
import Colors from './../../utils/colors';
import Theme from './../../utils/theme';
import Format from './../../utils/format';
import Info from './../Info';
import * as common from './../../props';

export default class WidgetBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setDimension();
    this.setAggregator();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.aggregators !== this.props.aggregators ||
      prevProps.dimensions !== this.props.dimensions ||
      prevProps.options.metrics !== this.props.options.metrics) {
      this.setDimension();
      this.setAggregator();
    }
  }

  setDimension() {
    this.setState({
      dimension: this.props.dimensions[0].name
    });
  }

  setAggregator() {
    this.setState({
      aggregator: this.props.options.metrics || this.props.aggregators[0].name
    });
  }

  transformData(data) {
    return data.map((d) => {
      return {...d, [this.state.dimension]: d[this.state.dimension] || 'N/A'};
    });
  }

  formatYAxis(value) {
    return Format.prefix(value, 2);
  }

  render () {
    if(this.props.error || this.props.data.length == 0) {
      return(<Info error={this.props.error} />)
    } else {
      const data = this.transformData(this.props.data);

      return (
        <ResponsiveContainer>
          <BarChart
            data = { data }
            margin = { {top: 5, right: 30, left: 20, bottom: 5} } >
            <CartesianGrid stroke = { Theme.grid(this.props.theme) } />
            <XAxis
              dataKey = { this.state.dimension }
              domain = { ['auto', 'auto'] }
              stroke = { Theme.text(this.props.theme) }
              tick = { { fontSize: 12 } }
            />
            <YAxis
              tickFormatter = { this.formatYAxis }
              stroke = { Theme.text(this.props.theme) }
              tick = { { fontSize: 12 } }
            />
            <Tooltip
              formatter = { Format.fixed.bind(Format) }
              labelStyle = { { color: Theme.tooltip(this.props.theme).color } }
            />
            <Legend />
            <Bar
              dataKey = { this.state.aggregator }
              fill = { this.props.options.color || Colors.get(0) }
            />
            {
              (this.props.options.thresholds || []).map((threshold, index) => (
                <ReferenceLine
                  key = { 'reference-' + index }
                  y = { threshold.value }
                  stroke = { threshold.color }
                  strokeDasharray='3 3'>
                  <Label
                    value = { threshold.label }
                    offset = { 3 }
                    position = 'insideBottomRight'
                    stroke = { Theme.text(this.props.theme) } />
                </ReferenceLine>
              ))
            }
          </BarChart>
        </ResponsiveContainer>
      )
    }
  }
};

WidgetBar.propTypes = {
  ...common.BASE,
  theme: PropTypes.oneOf(['dark', 'light']),
  aggregators: PropTypes.arrayOf(PropTypes.object).isRequired,
  dimensions: PropTypes.arrayOf(PropTypes.object).isRequired,
  options: PropTypes.shape({
    ...common.THRESHOLDS,
    color: PropTypes.string
  })
};
