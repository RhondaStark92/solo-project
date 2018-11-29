import React, {Component} from 'react';
import {connect} from 'react-redux';
import ItemAdminForm from './ItemAdminForm';
import ItemList from './ItemList';
import styled from 'styled-components';

const Wrapper = styled.section`
  // padding: 2em;
  // margin-left: 25%;
  // margin-right: 25%;
`;

const Title = styled.h1`
  padding: 15px;
  text-align: center;
`;

class ItemAdminPage extends Component {

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_ITEMS'})
  }

  render() {

    return (
      <Wrapper>
          <ItemAdminForm />
          <ItemList />
      </Wrapper>
    )}
}

// Instead of taking everything from state, we just want the store info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  item: state.item,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ItemAdminPage);
