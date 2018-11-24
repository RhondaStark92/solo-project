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

class ItemForCategory extends Component {
  
  handleItemClick = item => () => {
    console.log('add item to list', item);
    // this.props.dispatch({ type: 'FOUND_ITEM', payload: {item: item, store_id: this.props.store_id}})
  };

  handleDeleteClick = item => () => {
    console.log('delete item', item);
    // this.props.dispatch({ type: 'FOUND_ITEM', payload: {item: item, store_id: this.props.store_id}})
  };

  render() {

    let itemOnList = true;
    if (this.props.itemForCat.quantity === null) {
      itemOnList = false;
    }
    
    return (
      <ListItem key={this.props.itemForCat.item_id} divider={true} dense={true}
          button onClick={this.handleItemClick(this.props.itemForCat.item_id)} >
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
            <IconButton onClick={this.handleDeleteClick(this.props.itemForCat.item_id)} 
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