import React, {Component} from 'react';
import {connect} from 'react-redux';
import CategoryAdminForm from './CategoryAdminForm';
import CategoryList from './CategoryList';
import styled from 'styled-components';

const Wrapper = styled.section`
  // padding: 2em;
  // margin-left: 25%;
  // margin-right: 25%;
`;

class CategoryAdminPage extends Component {

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_CATEGORY'})
  }

  render() {

    return (
      <Wrapper>
          <CategoryAdminForm />
          <CategoryList />
      </Wrapper>
    )}
}

// Instead of taking everything from state, we just want the store info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  category: state.category,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CategoryAdminPage);
