import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ShoppingListItem from './ShoppingListItem';
import StoreSelector from './StoreSelector';

const Wrapper = styled.section`
  text-align: center;
  // padding: 4em;
  // margin-left: 25%;
  // margin-right: 25%;
`;

const Title = styled.h1`
  padding: 15px;
  text-align: center;`;

// const Selector = styled.div`
//   text-align: center;`

class ShoppingList extends Component {

  state = {id: 0};

  handleChange = (event) => {
    this.setState({id: event.target.value});
    this.props.dispatch({type: 'FETCH_LIST', payload: event.target.value});
  };

  handleClearList = (event) => {
    this.props.dispatch({type: 'CLEAR_LIST'});
  };


  componentDidMount () {
    this.getListForStore();
  }

  getListForStore = () => {
    this.props.dispatch({type: 'FETCH_LIST', payload: this.state.id})
    // console.log('in shopping list did mount', this.props.list);    
    // this.props.dispatch({ type: 'FETCH_STORES'})
    console.log('AFTER the store list', this.state.id);
  }

  render() {
    return (
      <Wrapper>
          <Title>Shopping List</Title>
          <div>
            <StoreSelector store_id={this.state.id} 
              handleChange={this.handleChange}/>
          </div>
          <List>
            {this.props.list.map(item => (
              <ShoppingListItem key={item.id} item={item} store_id={this.state.id} />
            ))}
          </List>
          <div>
          <Button variant="contained" onClick={this.handleClearList}>Clear List</Button>
          </div>
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
