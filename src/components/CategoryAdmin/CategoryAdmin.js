import React, {Component} from 'react';
import {connect} from 'react-redux';
import CategoryAdminForm from './CategoryAdminForm';
import CategoryList from './CategoryList';
import styled from 'styled-components';

class CategoryAdminPage extends Component {

  // dispatch to get all categories
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_CATEGORY'})
  }

  render() {

    return (
      <div>
          <CategoryAdminForm />
          <CategoryList />
      </div>
    )}
}

// Instead of taking everything from state, we just want the category info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  category: state.category,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CategoryAdminPage);
