import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleButton from '@material-ui/icons/AddCircle';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

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

const emptyCategoryObject = {
  name: '',
  person_id: 0,
}

class CategoryAdminForm extends Component {

  state = {newCategory: emptyCategoryObject};

  // update state from inputs
  handleChange = event => {
      // console.log('event happened', event, this.state);
      this.setState({
        newCategory: {
            ...this.state.newCategory,
            [event.target.name]: event.target.value,
        }
      });
  }

  // verify that name has been filled out
  validCategoryData = () => {
    let check = this.state.newCategory;
    if (check.name === '') {
      alert('Please enter a category name.');
      return false;
    } else {
      return true;
    }
  };

  // add a new store only if valid name
  addNewCategory = event => {
      event.preventDefault();
      if (this.validCategoryData()) {
        // console.log('category data', this.state.newCategory);
        
        this.props.dispatch({ type: 'ADD_CATEGORY', payload: this.state.newCategory });
        this.setState({
            newCategory: emptyCategoryObject
        });
      }
  }

  render() {
    return (
      <Wrapper>
        {/* <Title>Add Category</Title> */}
        <TextField
          name="name"
          id="outlined-name"
          placeholder="Category Name"
          value={this.state.newCategory.name}
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
        />
        <div>
           <IconButton color="primary" onClick={this.addNewCategory} 
              aria-label="Add">
              <AddCircleButton fontSize="large"/>
            </IconButton>
 
          {/* <Button onClick={this.addNewCategory} type='submit' value='Add New Category'>Add</Button> */}
        </div>
      </Wrapper>
    ); // end return
  } // end render
} // end AdminForm class

const mapStateToProps = state => ({
  category: state.category,
});

export default connect(mapStateToProps) (withStyles(styles)(CategoryAdminForm));