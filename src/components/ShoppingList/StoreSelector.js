import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';

class StoreSelector extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_STORES'})
  }

  renderStoreOptions() {
    return this.props.store.map((Store, index) => {
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
      <FormControl fullWidth={true}>
        <Select fullWidth={true}
          value={this.props.store_id}
          // displayEmpty
          // variant="filled"
          // placeholder="Select Store"
          name="store_id"
          onChange={this.props.handleChange}
          // input={
          //   <OutlinedInput
          //     labelwidth="300"
          //     name="age"
          //   />
          // }
        >
        <MenuItem
          key='1a'
          value='0'>
          Select your Store
        </MenuItem>

          {this.renderStoreOptions()}
        </Select>
      </FormControl>
    )
  } // end return
} // end class StoreSelector

// const mapReduxStateToProps = (reduxState) => ({
//   reduxState
// });

const mapStateToProps = state => ({
  store: state.store,
});

export default connect(mapStateToProps)(StoreSelector);