import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

class ShoppingList extends Component {
  
  state = {
    checked: [0],
  };

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_LIST'})
    console.log('in shopping list did mount', this.props.list);    
  }

  render() {
    return (
      <div>
        <h1>Shopping List</h1>
        {/* <pre>{JSON.stringify(this.props.list)}</pre> */}
        <List>
          {this.props.list.map(item => (
            <ListItem key={item.id} role={undefined} dense button>
              <Checkbox
                checked={this.state.checked.indexOf(item) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={item.item}  />
              <ListItemSecondaryAction>
                {/* <IconButton aria-label="Comments">
                  <CommentIcon />
                </IconButton> */}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

      </div>
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
