import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import ShoppingListItem from './ShoppingListItem';
import StoreSelector from './StoreSelector';

const Wrapper = styled.section`
  // padding: 4em;
  margin-left: 25%;
  margin-right: 25%;
`;

const Title = styled.h1`
  padding: 15px;
  text-align: center;
`;

const Selector = styled.div`
  margin-left:15%;
  margin-right:15%;
  padding-bottom: 50px;
`;

class ShoppingList extends Component {

  state = {id: 0};

  // changeHandler(event) {
  //   this.setState({ yourName: event.target.value }, () => 
  //   console.log(this.state.yourName));
  // }

  // update state from inputs
  handleChange = event => {
    // change the list according to the store selected
    this.setState({id: event.target.value}, () => 
    console.log('select store event happened', event.target.value, this.state.id));
    this.getListForStore();
  }

  componentDidMount () {
    this.getListForStore();
  }

  getListForStore = () => {
    console.log('fetching the store list', this.state.id);
    
    this.props.dispatch({type: 'FETCH_LIST', payload: this.state.id})
    // console.log('in shopping list did mount', this.props.list);    
    this.props.dispatch({ type: 'FETCH_STORES'})
    console.log('AFTER the store list', this.state.id);
  }

  render() {
    return (
      <Wrapper>
        {/* <Paper> */}
          <Title>Shopping List</Title>
          <Selector>
            <StoreSelector store_id={this.state.id} 
              handleChange={this.handleChange}/>
          </Selector>
          <List>
            {this.props.list.map(item => (
              <ShoppingListItem key={item.id} item={item} store_id={this.state.id} />
            ))}
          </List>
        {/* </Paper> */}
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
