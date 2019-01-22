import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import styled from 'styled-components';
import ShoppingListItem from './ShoppingListItem';
import StoreSelector from './StoreSelector';
import ClearButton from './ClearButton';
import Typography from '@material-ui/core/Typography';

const Wrapper = styled.section`
  text-align: center;
  // padding: 4em;
  // margin-left: 25%;
  // margin-right: 25%;
`;

class ShoppingList extends Component {

  state = {id: 0};

  handleChange = (event) => {
    this.setState({id: event.target.value});
    this.props.dispatch({type: 'FETCH_LIST', payload: event.target.value});
  };

  handleClearList = (event) => {
    this.props.dispatch({type: 'CLEAR_LIST', payload: {store_id: this.state.id}});
  };

  handleRemoveClick = item => () => {
    this.props.dispatch({ type: 'DELETE_LIST_ITEM', payload: {id: item, store_id: this.state.id}});
  };

  componentDidMount () {
    this.getListForStore();
  }

  getListForStore = () => {
    this.props.dispatch({type: 'FETCH_LIST', payload: this.state.id})
  }

  render() {
    return (
      <Wrapper>
          <Typography variant="h4">Shopping List</Typography>
          <div>
            <StoreSelector store_id={this.state.id} 
              handleChange={this.handleChange}/>
          </div>
          <List>
            {this.props.list.map(item => (
              <ShoppingListItem key={item.id} item={item} store_id={this.state.id}
                  handleRemoveClick={this.handleRemoveClick} />
            ))}
          </List>
          <div>
            <ClearButton handleClearList={this.handleClearList}/>
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
