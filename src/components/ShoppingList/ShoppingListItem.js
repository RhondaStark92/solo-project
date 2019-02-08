import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Cancel from'@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import { isNull } from 'util';
import Typography from '@material-ui/core/Typography';

class ShoppingListItem extends Component {

  // will need to update the found flag 
  // in the database and then refresh the list
  handleToggle = item => () => {
      this.props.dispatch({ type: 'FOUND_ITEM', payload: {item: item, store_id: this.props.store_id}})
  };

  render() {
    let item = this.props.item;
    let itemText = '';
    if (isNull(item.brand_name)) {
      itemText = `${item.quantity} - ${item.item}`;
    } else {
      itemText = `${item.quantity} - ${item.item}`;
    }
    if (item.found) {
      itemText = <Typography variant='body1' style={{ textDecoration: 'line-through' }}>{itemText} {isNull(item.brand_name) ? '' : <Chip color="primary" label={item.brand_name} />}</Typography>;
    } else {
      itemText = <Typography variant='body1'>{itemText} {isNull(item.brand_name) ? '' : <Chip color="primary" label={item.brand_name} />}</Typography>;
    }

    return (
      <ListItem key={item.id} divider={true} 
                role={undefined} button onClick={this.handleToggle(item)}>
            {/* <Typography> */}

            {/* <Badge color="primary" badgeContent={item.quantity} >              
          <ListItemText>
              {itemText}
          </ListItemText>
          </Badge> */}
          {/* {props.user.id ? `Let's Shop!` : 'Login / Register'} */}
            <ListItemText>
            {itemText}
          </ListItemText>
            {/* </Typography> */}
          <ListItemSecondaryAction>
            <IconButton onClick={this.props.handleRemoveClick(item.id)} 
              aria-label="Remove">
              <Cancel />
            </IconButton>
            <Checkbox
              checked={item.found}
              tabIndex={-1}
              disableRipple
            />
          </ListItemSecondaryAction>
      </ListItem>
    )}
}

// Instead of taking everything from state, we just want the list info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  list: state.list,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ShoppingListItem);
