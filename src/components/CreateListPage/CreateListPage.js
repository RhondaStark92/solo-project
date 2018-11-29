import React, {Component} from 'react';
import {connect} from 'react-redux';
import CategoryList from './CategoryList';
import styled from 'styled-components';

const Wrapper = styled.section`
  // padding: 4em;
  // margin-left: 25%;
  // margin-right: 25%;
`;

const Title = styled.h1`
  text-align: center;
`;

class CreateListPage extends Component {

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_CATEGORY'});
    this.props.dispatch({type: 'FETCH_ITEMS_FOR_LIST'});
  }

  render() {
    return (
      <Wrapper>
          <Title>Create Shopping List</Title>
            {/* <List> */}
              {this.props.category.map(cat => (
                <CategoryList key={cat.id} category={cat}/>
              ))}
            {/* </List> */}
      </Wrapper>
    )}
}

// Instead of taking everything from state, we just want the list info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  item: state.item,
  category: state.category,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CreateListPage);
// 