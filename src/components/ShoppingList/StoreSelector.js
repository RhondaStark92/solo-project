import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

class StoreSelector extends Component {

  renderStoreOptions() {
    // 
    return this.props.reduxState.store.map((Store, index) => {
      return (
        <MenuItem
          key={index}
          value={Store.id}>
          {Store.name} : {Store.location}
        </MenuItem>
      ); // end return
    }); // end map
  } // end renderStoreOptions

  render(){
    return (
      <FormControl fullWidth="true">
        <Select autowidth="true"
          value={this.props.store_id}
          // displayEmpty
          placeholder="Select Store"
          name="store_id"
          onChange={this.props.handleChange}
        >
          {this.renderStoreOptions()}
        </Select>
      </FormControl>
    )
  } // end return
} // end class StoreSelector

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(StoreSelector);