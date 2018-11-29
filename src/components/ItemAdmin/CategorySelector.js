import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

class CategorySelector extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CATEGORY'})
  }

  renderCategoryOptions() {
    // 
    return this.props.category.map((Category, index) => {
      return (
        <MenuItem
          key={index}
          value={Category.id}>
          {Category.name} 
        </MenuItem>
      ); // end return
    }); // end map
  } // end renderStoreOptions

  render(){
    return (
      <FormControl>
        <Select autowidth="true"
          value={this.props.category_id}
          displayEmpty
          placeholder="Select Category"
          name="category_id"
          onChange={this.props.handleChange}
        >
          {this.renderCategoryOptions()}
        </Select>
      </FormControl>
    )
  } // end return
} // end class StoreSelector

// const mapReduxStateToProps = (reduxState) => ({
//   reduxState
// });

const mapStateToProps = state => ({
  category: state.category,
});

export default connect(mapStateToProps)(CategorySelector);