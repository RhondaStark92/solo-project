import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import ShoppingListItem from './ShoppingListItem';

const Wrapper = styled.section`
  padding: 4em;
  margin-left: 25%;
  margin-right: 25%;
`;

const Title = styled.h1`
  padding: 15px;
  text-align: center;
`;

class ShoppingList extends Component {

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_LIST'})
    console.log('in shopping list did mount', this.props.list);    
  }

  render() {
    return (
      <Wrapper>

      <Paper>
        <Title>Shopping List</Title>
        {/* <pre>{JSON.stringify(this.props.list)}</pre> */}
        <List>
          {this.props.list.map(item => (
            <ShoppingListItem key={item.id} item={item} />
          ))}
        </List>
        </Paper>
      </Wrapper>
    )}
}

// Instead of taking everything from state, we just want the list info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  list: state.list,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ShoppingList);
