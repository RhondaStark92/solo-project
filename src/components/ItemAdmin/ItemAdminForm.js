import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleButton from '@material-ui/icons/AddCircle';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import CategorySelector from './CategorySelector';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 100,
    marginRight: 10,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const Wrapper = styled.section`
  // padding: 2em;
  text-align: center;
`;

const Title = styled.h3`
  text-align: center;
`;

const emptyItemObject = {
  category_id: 1,
  name: '',
  brand_name: '',
  person_id: 0,
}

class ItemAdminForm extends Component {

  state = {newItem: emptyItemObject};

  // update state from inputs
  handleChange = event => {
      // console.log('event happened', event, this.state);
      this.setState({
        newItem: {
            ...this.state.newItem,
            [event.target.name]: event.target.value,
        }
      });
  }

  // verify that name has been filled out
  validItemData = () => {
    let check = this.state.newItem;
    if (check.name === '') {
      alert('Please enter an item name.');
      return false;
    } else {
      return true;
    }
  };

  // add a new store only if valid name
  addNewItem = event => {
      event.preventDefault();
      if (this.validItemData()) {
        console.log('Item data', this.state.newItem);
        
        this.props.dispatch({ type: 'ADD_ITEM', payload: this.state.newItem });
        this.setState({
            newItem: emptyItemObject
        });
      }
  }

  render() {
    return (
      <Wrapper>
        {/* <Title>Add Item</Title> */}
        <TextField
          name="name"
          id="outlined-name"
          placeholder="Item Name"
          value={this.state.newItem.name}
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
        />
        <TextField
          name="brand_name"
          id="outlined-name"
          placeholder="Brand Name"
          value={this.state.newItem.brand_name}
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
        />
        <div>
          <CategorySelector category_id={this.state.newItem.category_id} handleChange={this.handleChange} />
        </div>
        <div>
          <IconButton onClick={this.addNewItem} 
            aria-label="Add" fontSize="large">
            <AddCircleButton />
          </IconButton>
 
          {/* <Button onClick={this.addNewItem} type='submit' value='Add New Item'>Add</Button> */}
        </div>
      </Wrapper>
    ); // end return
  } // end render
} // end AdminForm class

const mapStateToProps = state => ({
  item: state.item,
});

export default connect(mapStateToProps) (withStyles(styles)(ItemAdminForm));