import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const emptyStoreObject = {
  name: '',
  location: '',
  person_id: 0,
}

class StoreAdminForm extends Component {

  state = {newStore: emptyStoreObject};

  // update state from inputs
  handleChange = event => {
      console.log('event happened', event, this.state);
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
        console.log('store data', this.state.newStore);
        
        this.props.dispatch({ type: 'ADD_STORE', payload: this.state.newStore });
        this.setState({
            newStore: emptyStoreObject
        });
      }
  }

  render() {
    return (
      <div>
        <h3>Add Store</h3>
        {/* <pre>{JSON.stringify(this.state.newProject)}</pre> */}
        {/* <form onSubmit={this.addNewStore}> */}
        {/* <div> */}
          {/* Project name input */}
          <Input
          name="name"
          placeholder="Store Name"
          onChange={this.handleChange}
          value={this.state.newStore.name}/>
          {/* Project date completed date selector */}
          <Input
          name="location"
          placeholder="Store Location"
          onChange={this.handleChange}
          value={this.state.newStore.location}/>
        {/* </div> */}
        {/* <div> */}
        <Button onClick={this.addNewStore} type='submit' value='Add New Store'>Add</Button>
        {/* </div> */}
        {/* </form> */}
      </div>
    ); // end return
  } // end render
} // end AdminForm class

const mapStateToProps = state => ({
  store: state.store,
});

export default connect(mapStateToProps)(StoreAdminForm);