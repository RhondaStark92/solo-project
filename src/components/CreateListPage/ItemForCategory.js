import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
// import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForever from '@material-ui/icons/DeleteForever';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { confirmAlert } from 'react-confirm-alert';
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
    // console.log('add item to list', itemForCat);
  };

  handleRemoveClick = item => () => {
    if (item != null) {
      // console.log('delete item', item);
      this.props.dispatch({ type: 'DELETE_ITEM_FROM_LIST', payload: {id: item, store_id: 0}});
    }
  };

  // handleDeleteClick = item => () => {
  //   // if (item != null) {
  //     console.log('delete item', item);
  //     // this.props.dispatch({ type: 'DELETE_LIST_ITEM', payload: item});
  //   // }
  // };

  // handle Delete click
  // handleDeleteClick = id => () => {
  //   // confirm the deletion 
  //   console.log('in delete click', id)
  //   confirmAlert({
  //     title: 'Confirm to delete',
  //     message: 'Are you sure? This is permanent and will remove all items in the grocery list.',
  //     buttons: [
  //       {
  //         label: 'Delete',
  //         onClick: () => {
  //           this.props.dispatch({ type: 'DELETE_ITEM', payload: id});
  //           this.props.dispatch({type: 'FETCH_ITEMS_FOR_LIST'});
  //         }
  //       },
  //       {
  //         label: 'Cancel',
  //         onClick: () => console.log('cancelled delete do nothing.')
  //       }
  //     ]
  //   })// end confirmAlert
  // }; // end handleClick

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
        {/* <Typography variant='body1'> */}
        <Badge color="primary" badgeContent={this.props.itemForCat.quantity} invisible={!itemOnList} >              
          <ListItemText>
              {this.props.itemForCat.item}
          </ListItemText>
          </Badge>
        {/* </Typography> */}
        <ListItemSecondaryAction>
            {/* <IconButton onClick={this.handleDeleteClick(this.props.itemForCat.list_id)} 
              aria-label="Delete">
              <DeleteForever />
            </IconButton> */}

            <IconButton onClick={this.handleRemoveClick(this.props.itemForCat.list_id)} 
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