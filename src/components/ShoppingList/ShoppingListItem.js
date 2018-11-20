import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';
import { isNull } from 'util';
import Typography from '@material-ui/core/Typography';


const FoundItem = styled.p`
  font-style: oblique
`;

class ShoppingListItem extends Component {

  state = {
    checked: [0],
  };

  // will need to update the found flag 
  // in the database and then refresh the list
  handleToggle = item => () => {
    console.log('item clicked', item.found);
    if (item.found) {
      // Do I want to do anything here? Should I reset??
    } else {
      // Set found to true in the database and then refresh the list
      // Dispatch to the saga to mark the item as found
      this.props.dispatch({ type: 'FOUND_ITEM', payload: item.id})
    }

    
    // const { checked } = this.state;
    // const currentIndex = checked.indexOf(item);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //   newChecked.push(item);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }

    // this.setState({
    //   checked: newChecked,
    // });
  };

  render() {
    let item = this.props.item;
    let itemText = '';
    if (isNull(item.brand_name)) {
      itemText = `(${item.quantity}) ${item.item}`;
    } else {
      itemText = `(${item.quantity}) ${item.item} - ${item.brand_name}`;
    }
    if (item.found) {
      itemText = <Typography variant='body1' style={{ textDecoration: 'line-through' }}>{itemText}</Typography>;
    } else {
      itemText = <Typography variant='body1'>{itemText}</Typography>;
    }

    
    return (
      <ListItem key={item.id} divider={true} 
                role={undefined} button onClick={this.handleToggle(item)}>
          <ListItemText>
            {itemText}
          </ListItemText>
          <ListItemSecondaryAction>
            <Checkbox
              // checked={this.state.checked.indexOf(item) !== -1}
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
