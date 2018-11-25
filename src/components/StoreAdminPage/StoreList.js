import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { confirmAlert } from 'react-confirm-alert';
import '../../../node_modules/react-confirm-alert/src/react-confirm-alert.css'
// import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class StoreList extends Component {

  // mounting GET response to the DOM, when rendered
  componentDidMount() {
    this.getStores();
  };

  // get all projects
  getStores = () => {
    this.props.dispatch({ type: 'FETCH_STORES'})
  }

  // handle Delete click
  handleClick = (id) => {
    // confirm the deletion 
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure? This is permanent.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => this.props.dispatch({ type: 'DELETE_STORE', payload: id})
        },
        {
          label: 'Cancel',
          onClick: () => console.log('cancelled delete do nothing.')
        }
      ]
    })// end confirmAlert
  } // end handleClick

  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Store</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.store.map(store =>
            <TableRow key={store.id}>
              <TableCell>{store.name}</TableCell>
              <TableCell>
                <Button onClick={() => this.handleClick(store.id)}>X</Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  } // end render
} // end StoreList class

const mapStateToProps = state => ({
  store: state.store,
});

export default connect(mapStateToProps)(StoreList);