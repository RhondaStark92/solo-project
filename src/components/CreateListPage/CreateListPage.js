import React, {Component} from 'react';
import {connect} from 'react-redux';
// import List from '@material-ui/core/List';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
// import ShoppingListItem from './ShoppingListItem';
// import StoreSelector from './StoreSelector';

const Wrapper = styled.section`
  // padding: 4em;
  margin-left: 25%;
  margin-right: 25%;
`;

const Title = styled.h1`
  padding: 15px;
  text-align: center;
`;

// const Selector = styled.div`
//   margin-left:15%;
//   margin-right:15%;
//   padding-bottom: 50px;
// `;

class CreateList extends Component {

  state = {id: 0};

  componentDidMount () {
  }

  render() {
    return (
      <Wrapper>
        <Paper>
          <Title>Create Shopping </Title>
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
export default connect(mapStateToProps)(CreateList);
// 