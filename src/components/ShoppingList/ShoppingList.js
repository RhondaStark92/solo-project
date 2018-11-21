import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import ShoppingListItem from './ShoppingListItem';
import StoreSelector from './StoreSelector';


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

  state = {id: 1};

    // update state from inputs
  handleChange = event => {
    console.log('select store event happened', event.target.value, this.state.id);
    // change the list according to the store selected
    this.setState({
      id: {[event.target.name]: event.target.value,}
    });
  }

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_LIST', payload: this.state.id})
    // console.log('in shopping list did mount', this.props.list);    
    this.props.dispatch({ type: 'FETCH_STORES'})
  }

  render() {
    return (
      <Wrapper>
        <Paper>
          <Title>Shopping List</Title>
          {/* <pre>{JSON.stringify(this.props.list)}</pre> */}
          <StoreSelector store_id={this.state} 
            handleChange={this.handleChange}/>
          <List>
            {this.props.list.map(item => (
              <ShoppingListItem key={item.id} item={item} store_id={this.state.id} />
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
