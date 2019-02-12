import React, {Component} from 'react';
import {connect} from 'react-redux';
import StoreAdminForm from './StoreAdminForm';
import StoreList from './StoreList';

class StoreAdminPage extends Component {

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_STORES'})
  }

  render() {

    return (
      <div>
          {/* <StoreAdminForm /> */}
          <StoreList />
      </div>
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
