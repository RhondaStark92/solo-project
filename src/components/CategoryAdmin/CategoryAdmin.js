import React, {Component} from 'react';
import {connect} from 'react-redux';
import CategoryAdminForm from './CategoryAdminForm';
import CategoryList from './CategoryList';
import styled from 'styled-components';
// import Paper from '@material-ui/core/Paper';

const Wrapper = styled.section`
  // padding: 2em;
  // margin-left: 25%;
  // margin-right: 25%;
`;

const Title = styled.h1`
  padding: 15px;
  text-align: center;
`;

class CategoryAdminPage extends Component {

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_STORES'})
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
