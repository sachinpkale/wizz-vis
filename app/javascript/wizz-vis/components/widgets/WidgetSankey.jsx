/* jshint esversion: 6 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import Colors from './../../utils/colors';

export default class WidgetSankey extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      $$data: {nodes: [], links: []},
      dimensions: [],
      aggregator: '',
      fetchDataError: null
    };
  }

  componentDidMount() {
    this.setDimensions();
    this.setAggregator();
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reloadTimestamp !== this.props.reloadTimestamp) {
      this.fetchData();
    }
  }

  fetchData() {
    let button = $('.preloader-wrapper[widget_id="' + this.props.id + '"]');
    button.addClass('active');
    return (
      fetch('/widgets/' + this.props.id + '/data.json')
        .then(response => response.json())
        .then(data => this.formatData(data))
        .then(data => this.setState({ $$data: data }))
        .then(data => button.removeClass('active'))
    );
  }

  setDimensions() {
    this.setState({
      dimensions: this.props.dimensions.map((d) => d.name)
    })
  }

  setAggregator() {
    this.setState({
      aggregator: this.props.aggregators[0].name
    });
  }

  formatData(data) {
    const aggregator = this.state.aggregator;
    const dimensions = this.state.dimensions;
    let nodes = new Set();
    let links = [];

    for(let row of data) {
      var value = row[aggregator];

      dimensions.forEach(function(d) {
        nodes.add(row[d]);
      });

      for(let i = 0; i < dimensions.length - 1; i++) {
        let linkIndex = -1;

        links.forEach(function (d, index) {
          if (d.source === row[dimensions[i]] && d.target === row[dimensions[i + 1]]) {
            linkIndex = index;
          }
        });

        if (linkIndex === -1) {
          links.push({
            source: row[dimensions[i]],
            target: row[dimensions[i + 1]],
            value
          });
        } else {
          links[linkIndex].value += value;
        }
      }
    }

    return {
      nodes: [...nodes].map((n) => ({name: n})),
      links
    };
  }

  getNodes(){
    return this.state.$$data.nodes;
  }

  getLinks(){
    return this.state.$$data.links;
  }

  sankeyOptions() {
    return {
      color: Colors.all(),
      tooltip: {},
      series: [
        {
          type: 'sankey',
          nodes: this.getNodes(),
          links: this.getLinks(),
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#aaa'
            }
          },
          lineStyle: {
            normal: {
              color: 'source',
              opacity: 0.5
            }
          }
        }
      ]
    };
  }

  render () {
    if(this.getNodes().length == 0)
      return(<h5>No data points.</h5>)

    return (
      <ReactEcharts
        option={ this.sankeyOptions() }
        style={
          { position: 'absolute',
            width: '100%', height: '100%',
            top: 10, left: 0 }
        }
        className='sankey'
      />
    )
  }
}