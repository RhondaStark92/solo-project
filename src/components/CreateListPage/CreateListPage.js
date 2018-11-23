import React, {Component} from 'react';
import {connect} from 'react-redux';
import CategoryList from './CategoryList';
// import ItemListForCategory from './ItemListForCategory';
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

class CreateListPage extends Component {
// 
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_CATEGORY'});
    this.props.dispatch({type: 'FETCH_ITEMS_FOR_LIST'});
  }

  render() {
    // const listForCat = this.props.item.filter(cat => cat.category_id === this.props.category.category_id);
    return (
      <Wrapper>
        <Paper>
          <Title>Create Shopping List</Title>
          <div>
            {this.props.category.map(cat => (
              <CategoryList category={cat}/>
            ))}
          </div>
        </Paper>
      </Wrapper>
    )}
}

// Instead of taking everything from state, we just want the list info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  item: state.item,
  category: state.category,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CreateListPage);
// 