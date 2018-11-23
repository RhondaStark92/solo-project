import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class ItemListForCategory extends Component {

  // state = {id: 0};

  // componentDidMount () {
  //   this.props.dispatch({type: 'FETCH_ITEMS_FOR_LIST'})
  // }
  
  // function isCategory(this.cat) {
  //   return this.cat.category_id === 1;
  // }
   
  // let listForCat = this.cat.filter(isCategory);
  
  render() {
    return (
      <ExpansionPanelDetails>
        <Typography>
            {this.props.itemsForCategory.map(itemForCat => (
              <li key={itemForCat.item_id}>{itemForCat.item}</li>
              // <ShoppingListItem key={cat.id} item={item} store_id={this.state.id} />
            ))}
        </Typography>
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