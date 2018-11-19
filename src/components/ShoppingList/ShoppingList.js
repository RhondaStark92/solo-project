import React, {Component} from 'react';
import {connect} from 'react-redux';

class ShoppingList extends Component {
  
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_LIST'})
    console.log('in shopping list did mount', this.props.list);    
  }

  render() {
    return (
      <h1>Shopping List</h1>
      // <pre>JSON.stringify({this.props.reduxState.list})</pre>
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
