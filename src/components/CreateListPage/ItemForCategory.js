import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForever from '@material-ui/icons/DeleteForever';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { confirmAlert } from 'react-confirm-alert';
import ItemForm from './ItemForm';
import '../../../node_modules/react-confirm-alert/src/react-confirm-alert.css'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  ExpansionPanelDetails: {
    padding: 0,
  }
});

const emptyListItem = {
  item_id: 0,
  quantity: 0,
  person_id: 0
};

class ItemForCategory extends Component {
  
  state = { newListItem: emptyListItem };

  handleItemClick = itemForCat => () => {
    if (itemForCat.quantity === null) {
      itemForCat.quantity = 1;
      this.props.dispatch({ type: 'ADD_ITEM_TO_LIST', payload: itemForCat});
    } else {
      itemForCat.quantity += 1;
      this.props.dispatch({ type: 'UPDATE_QUANTITY', payload: itemForCat})
    }
  };

  handleRemoveClick = item => () => {
    if (item != null) {
      this.props.dispatch({ type: 'DELETE_ITEM_FROM_LIST', payload: {id: item, store_id: 0}});
    }
  };

  // handle Delete click
  handleDeleteClick = id => () => {
    // confirm the deletion 
    console.log('in delete click', id)
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => {
            this.props.dispatch({ type: 'DELETE_ITEM', payload: id});
          }
        },
        {
          label: 'Cancel',
          onClick: () => console.log('cancelled delete do nothing.')
        }
      ]
    })// end confirmAlert
  }; // end handleClick

  render() {

    let itemOnList = true;
    if (this.props.itemForCat.quantity === null) {
      itemOnList = false;
    }
    
    return (
      <ListItem key={this.props.itemForCat.item_id} divider={true} dense={true}
          button onClick={this.handleItemClick(this.props.itemForCat)} >
          <Checkbox
              checked={itemOnList}
              tabIndex={-1}
              disableRipple
            />
        <Badge color="primary" badgeContent={this.props.itemForCat.quantity} invisible={!itemOnList} >              
          <ListItemText
              primary={this.props.itemForCat.item} secondary={this.props.itemForCat.brand_name}
          />
          </Badge>
        <ListItemSecondaryAction>
            <ItemForm status={false} category_name={this.props.itemForCat.name} category_id = {this.props.itemForCat.id}/>
            <IconButton color='primary' onClick={this.handleDeleteClick(this.props.itemForCat.item_id)} 
              aria-label="Delete">
              <DeleteForever />
            </IconButton>
            <IconButton color='primary' onClick={this.handleRemoveClick(this.props.itemForCat.list_id)} 
              aria-label="Remove">
              <RemoveCircle />
            </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )}
}

// Instead of taking everything from state, we just want the item info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  item: state.item,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(ItemForCategory));
// 