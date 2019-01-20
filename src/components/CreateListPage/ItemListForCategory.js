import React, {Component} from 'react';
import {connect} from 'react-redux';
// import styled from 'styled-components';
import ItemForCategory from './ItemForCategory';
import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
// import Checkbox from '@material-ui/core/Checkbox';

// const listDiv = styled.div`
//   width: 100%;
// `;

class ItemListForCategory extends Component {

  render() {
    return (
      <ExpansionPanelDetails>
        <List>
            {this.props.itemsForCategory.map(itemForCat => (
              <ItemForCategory key={itemForCat.id} itemForCat={itemForCat} />
            ))}
        </List>
      </ExpansionPanelDetails>
              // <ShoppingListItem key={cat.id} item={item} store_id={this.state.id} />
    )}
}

// Instead of taking everything from state, we just want the list info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  item: state.item,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ItemListForCategory);
// 