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
import ItemUpdate from './ItemUpdate';
// import { isNull } from 'util';
// import StoreCategoryAdmin from './StoreCategoryOrder';

class ItemList extends Component {

  handleItemClick = id => () => {
    console.log('select item', id);
    // <StoreCategoryAdmin />
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
          onClick: () => this.props.dispatch({ type: 'DELETE_ITEM', payload: id})
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
      {this.props.item.map(item => (
          <ListItem key={item.id} divider={true} dense={false}
            button onClick={this.handleItemClick(item.id)} >
          <ListItemText>
              {item.name} {item.brand_name}
          </ListItemText>
        <ListItemSecondaryAction>
            <IconButton onClick={this.handleDeleteClick(item.id)} 
              aria-label="Delete">
              <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
       </ListItem>
        ))}
      </List>
    );
  } // end render
} // end itemList class

const mapStateToProps = state => ({
  item: state.item,
});

export default connect(mapStateToProps)(ItemList);