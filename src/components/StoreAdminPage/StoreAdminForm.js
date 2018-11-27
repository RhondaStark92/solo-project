import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
  padding: 2em;
  text-align: center;
`;

const Title = styled.h3`
  text-align: center;
`;

const emptyStoreObject = {
  name: '',
  location: '',
  person_id: 0,
}

class StoreAdminForm extends Component {

  state = {newStore: emptyStoreObject};

  // update state from inputs
  handleChange = event => {
      // console.log('event happened', event, this.state);
      this.setState({
        newStore: {
            ...this.state.newStore,
            [event.target.name]: event.target.value,
        }
      });
  }

  // verify that name has been filled out
  validStoreData = () => {
    let check = this.state.newStore;
    if (check.name === '') {
      alert('Please enter a store name.');
      return false;
    } else {
      return true;
    }
  };

  // add a new store only if valid name
  addNewStore = event => {
      event.preventDefault();
      if (this.validStoreData()) {
        // console.log('store data', this.state.newStore);
        
        this.props.dispatch({ type: 'ADD_STORE', payload: this.state.newStore });
        this.setState({
            newStore: emptyStoreObject
        });
      }
  }

  render() {
    return (
      <Wrapper>
        <Title>Add Store</Title>
        <TextField
          name="name"
          id="outlined-name"
          placeholder="Store Name"
          value={this.state.newStore.name}
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
        />
        <TextField
          name="location"
          id="outlined-location"
          placeholder="Store Location"
          value={this.state.newStore.location}
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
        />
        <div>
          <Button onClick={this.addNewStore} type='submit' value='Add New Store'>Add</Button>
        </div>
      </Wrapper>
    ); // end return
  } // end render
} // end AdminForm class

const mapStateToProps = state => ({
  store: state.store,
});

export default connect(mapStateToProps) (withStyles(styles)(StoreAdminForm));