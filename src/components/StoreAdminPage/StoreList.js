import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { confirmAlert } from 'react-confirm-alert';
import '../../../node_modules/react-confirm-alert/src/react-confirm-alert.css'
import StoreCategoryOrder from './StoreCategoryOrder';

class StoreList extends Component {

  handleItemClick = id => () => {
    console.log('select store for ordering', id);
    // <StoreCategoryOrder />
  };

  // handle Delete click
  handleDeleteClick = id => () => {
    // confirm the deletion 
    console.log('in delete click', id)
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure? This is permanent.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => this.props.dispatch({ type: 'DELETE_STORE', payload: id})
        },
        {
          label: 'Cancel',
          onClick: () => console.log('cancelled delete do nothing.')
        }
      ]
    })// end confirmAlert
  }; // end handleClick

  render() {
 
    return (

      <List>
      {this.props.store.map(store => (
          <ListItem helperClass='sortableHelper' key={store.id} divider={true} dense={false}
            button onClick={this.handleItemClick(store.id)}>
          <ListItemText>
              {store.name} : {store.location}
          </ListItemText>
        <ListItemSecondaryAction>
            <StoreCategoryOrder store={store} />
            <IconButton onClick={this.handleDeleteClick(store.id)} 
              aria-label="Delete">
              <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
       </ListItem>
        ))}
      </List>
    );
  } // end render
} // end StoreList class

const mapStateToProps = state => ({
  store: state.store,
});

export default connect(mapStateToProps)(StoreList);