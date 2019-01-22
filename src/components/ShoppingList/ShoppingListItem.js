import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Cancel from'@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
// import styled from 'styled-components';
import { isNull } from 'util';
import Typography from '@material-ui/core/Typography';


// const FoundItem = styled.p`
//   font-style: oblique
// `;

class ShoppingListItem extends Component {

  // will need to update the found flag 
  // in the database and then refresh the list
  handleToggle = item => () => {
      this.props.dispatch({ type: 'FOUND_ITEM', payload: {item: item, store_id: this.props.store_id}})
  };

  // handleRemoveClick = item => () => {
  //   // if (item != null) {
  //     console.log('remove item from list', item);
  //     this.props.dispatch({ type: 'DELETE_LIST_ITEM', payload: item});
  //   // }
  // };

  render() {
    let item = this.props.item;
    let itemText = '';
    if (isNull(item.brand_name)) {
      itemText = `${item.quantity} - ${item.item}`;
    } else {
      itemText = `${item.quantity} - ${item.item} - ${item.brand_name}`;
    }
    if (item.found) {
      itemText = <Typography variant='body1' style={{ textDecoration: 'line-through' }}>{itemText}</Typography>;
    } else {
      itemText = <Typography variant='body1'>{itemText}</Typography>;
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
