import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

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

  state = {
    checked: [0],
  };

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_LIST'})
    console.log('in shopping list did mount', this.props.list);    
  }

  handleToggle = item => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(item);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    return (
      <Wrapper>

      <Paper>
        <Title>Shopping List</Title>
        {/* <pre>{JSON.stringify(this.props.list)}</pre> */}
        <List>
          {this.props.list.map(item => (
            <ListItem key={item.id} divider={true} role={undefined} button onClick={this.handleToggle(item)}>
              <Checkbox
                checked={this.state.checked.indexOf(item) !== -1}
                tabIndex={-1}
                // disableRipple
              />
              <ListItemText primary={item.item} 
                            secondary={item.brand_name}
              />
              <ListItemSecondaryAction>
                {item.quantity}
                {/* <IconButton aria-label="Comments">
                  <CommentIcon />
                </IconButton> */}
              </ListItemSecondaryAction>
            </ListItem>
            
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
