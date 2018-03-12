import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Theme from './../../utils/theme';

export default class WidgetLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      $$data: [],
      aggregator: '',
      grouped_dimension: '',
      coordinate_dimension: '',
      fetchDataError: null
    };
  }

  componentDidUpdate(){
    this.refs.map.leafletElement.invalidateSize();
  }

  componentDidMount() {
    this.setAggregator();
    this.setDimensions();
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reloadTimestamp !== this.props.reloadTimestamp) {
      this.fetchData();
    }
  }

  fetchData() {
    return (
      fetch('/widgets/' + this.props.id + '/data.json')
        .then(response => response.json())
        .then(data => data.map((d) => (
          {
            position: d[this.state.coordinate_dimension].split(',')
                      .map((e) => (parseFloat(e))),
            label: d[this.state.grouped_dimension]
          }
        )))
        .then(data => this.setState({ $$data: data }))
    )
  }

  setAggregator() {
    this.setState({
      aggregator: this.props.aggregators[0].name
    })
  }

  setDimensions() {
    let coordinate_dimension =
      this.props.dimensions.find((e) => (
        /coordinate|latlong|latlng/.test(e.name)
      ));
    this.setState({ coordinate_dimension: coordinate_dimension.name });

    let grouped_dimension =
      this.props.dimensions.find((e) => (
        e.name !== coordinate_dimension.name
      ));
    this.setState({ grouped_dimension: grouped_dimension.name });
  }

  render () {
    const bounds = this.state.$$data.map((e) => (e.position));

    return (
      <Map
        bounds={ bounds.length > 0 ? bounds : [[0,0]] }
        scrollWheelZoom={false}
        ref='map'>
        <TileLayer
          url={Theme.map(this.props.theme).url}
          attribution={Theme.map(this.props.theme).attribution}
        />
        {
          this.state.$$data.map((element, index) => (
            <Marker
              position={ element.position }
              key={ index }>
              <Popup>
                <span>{ element.label }</span>
              </Popup>
            </Marker>
          ))
        }
      </Map>
    );
  }
}