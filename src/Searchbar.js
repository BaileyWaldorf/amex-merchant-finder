import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
 
export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
 
  handleChange = address => {
    this.props.resubmit();
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.props.submitLocation()

    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
      console.log('Success', latLng)
      this.props.LatLng(latLng.lat, latLng.lng)
    })
    .catch(error => console.error('Error', error));
  };

  handleSubmit = suggestion => {
    this.setState({address: suggestion})
  }
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
              value={this.state.address}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer', marginBottom: '10px' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer', marginBottom: '10px' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span onClick={() => {this.handleSubmit(suggestion.description)}}>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}