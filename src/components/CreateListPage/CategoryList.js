import React, {Component} from 'react';
import {connect} from 'react-redux';
import ItemListForCategory from './ItemListForCategory';
import styled from 'styled-components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

// const CategoryTitle = styled.p`
// `;

class CategoryList extends Component {

  render() {

    // Filter the items for the current category
    const listForCat = this.props.item.filter(cat => cat.category_id === this.props.category.id);
    
    return (
      <ExpansionPanel key={this.props.category.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='body1'>{this.props.category.name}</Typography>
          </ExpansionPanelSummary>
          <ItemListForCategory itemsForCategory={listForCat} />
      </ExpansionPanel>
    )}
}

// Instead of taking everything from state, we just want the list info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  item: state.item,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CategoryList);
// 