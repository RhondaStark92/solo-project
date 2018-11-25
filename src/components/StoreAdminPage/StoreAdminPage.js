import React, {Component} from 'react';
import {connect} from 'react-redux';
import StoreAdminForm from './StoreAdminForm';
import StoreAdminList from './StoreList';
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

class StoreAdminPage extends Component {

  state = {id: 0};
  changeHandler(event) {
    this.setState({ yourName: event.target.value }, () => 
    console.log(this.state.yourName));
 }
    // update state from inputs
  handleChange = event => {
    // change the list according to the store selected
    this.setState({id: event.target.value}, () => 
    console.log('select store event happened', event.target.value, this.state.id));
    this.getListForStore();
  }

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_STORES'})
  }

  render() {
    return (
      <Wrapper>
        <Paper>
          <Title>Store Admin</Title>
          {/* <pre>{JSON.stringify(this.props.store)}</pre> */}
          <StoreAdminForm />
          <StoreAdminList />
        </Paper>
      </Wrapper>
    )}
}

// Instead of taking everything from state, we just want the store info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  store: state.store,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StoreAdminPage);
