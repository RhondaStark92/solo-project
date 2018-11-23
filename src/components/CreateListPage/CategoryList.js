import React, {Component} from 'react';
import {connect} from 'react-redux';
import ItemListForCategory from './ItemListForCategory';
import List from '@material-ui/core/List';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Wrapper = styled.section`
  // padding: 4em;
  margin-left: 25%;
  margin-right: 25%;
`;

const Title = styled.h1`
  padding: 15px;
  text-align: center;
`;

class CategoryList extends Component {

  render() {


    const listForCat = this.props.item.filter(cat => cat.category_id === this.props.category.category_id);
    
    return (
      <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{this.props.category.category}</Typography>
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