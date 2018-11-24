import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

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
    console.log('add item to list', itemForCat);
  };

  handleDeleteClick = item => () => {
    if (item != null) {
      console.log('delete item', item);
      this.props.dispatch({ type: 'DELETE_LIST_ITEM', payload: item});
    }
  };

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
        <Typography>
        <Badge color="secondary" badgeContent={this.props.itemForCat.quantity} invisible={!itemOnList} >              
          <ListItemText>
              {this.props.itemForCat.item}
          </ListItemText>
          </Badge>
        </Typography>
        <ListItemSecondaryAction>
          <div>
            {/* <IconButton aria-label="Add">
              <AddCircleIcon />
            </IconButton> */}
            <IconButton onClick={this.handleDeleteClick(this.props.itemForCat.list_id)} 
              aria-label="Delete">
              <DeleteIcon />
            </IconButton>

          </div>
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