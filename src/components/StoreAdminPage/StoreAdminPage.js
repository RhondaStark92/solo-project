import React, {Component} from 'react';
import {connect} from 'react-redux';
import StoreAdminForm from './StoreAdminForm';
import StoreAdminList from './StoreAdminList';
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

  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    console.log('in change', expanded, panel)
    this.setState({
      expanded: expanded ? panel : true,
    });
  };

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_STORES'})
    console.log('after fetch stores in '); 
  }

  render() {

    const { expanded } = this.state;
    console.log ('expanded', expanded);

    return (
      <Wrapper>
        <Paper>
          <Title>Store Admin</Title>
          <StoreAdminForm />
          {this.props.store.map(store => (
              <StoreAdminList key={store.id} storeIn={store} 
                expanded={expanded} handleChange={this.handleChange}/>
          ))}
          {/* <StoreAdminList /> */}
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
