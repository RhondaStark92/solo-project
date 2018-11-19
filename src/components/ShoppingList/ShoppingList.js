import React, {Component} from 'react';

class ShoppingList extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_LIST'})
    console.log('in shopping list did mount');    
  }

  render() {
    return (
      <h1>Shopping List</h1>
      <pre>JSON.stringify()</pre>
    )}
}

export default connect()(ShoppingList);
