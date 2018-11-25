import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
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

  handleItemClick = id => () => {
    console.log('select item for ordering', id);
  };

  // handleDeleteClick = id => () => {
  //   console.log('delete item', id);
  //   // this.props.dispatch({ type: 'DELETE_LIST_ITEM', payload: item});
  // };

  // handleItemClick = (id) => {
  //   // this handles the item click to reorder
  //   console.log('in item click', id);
  // }

  // handle Delete click
  handleDeleteClick = id => () => {
    // confirm the deletion 
    console.log('in delete click', id)
    // confirmAlert({
    //   title: 'Confirm to delete',
    //   message: 'Are you sure? This is permanent.',
    //   buttons: [
    //     {
    //       label: 'Delete',
    //       onClick: () => this.props.dispatch({ type: 'DELETE_STORE', payload: id})
    //     },
    //     {
    //       label: 'Cancel',
    //       onClick: () => console.log('cancelled delete do nothing.')
    //     }
    //   ]
    // })// end confirmAlert
  }; // end handleClick

  render() {
    return (
      <List>
      {this.props.store.map(store => (
          <ListItem key={store.id} divider={true} dense={true}
            button onClick={this.handleItemClick(store.id)} >
        <Typography>
          <ListItemText>
              {store.name} {store.location}
          </ListItemText>
        </Typography>
        <ListItemSecondaryAction>
          {/* <div> */}
            <IconButton onClick={this.handleDeleteClick(store.id)} 
              aria-label="Delete">
              <DeleteIcon />
            </IconButton>

          {/* </div> */}
        </ListItemSecondaryAction>
       </ListItem>
        ))}
      </List>

      // <Table>
      //   <TableHead>
      //     <TableRow>
      //       <TableCell>Store</TableCell>
      //       <TableCell>Action</TableCell>
      //     </TableRow>
      //   </TableHead>
      //   <TableBody>
      //     {this.props.store.map(store =>
      //       <TableRow key={store.id}>
      //         <TableCell>{store.name}</TableCell>
      //         <TableCell>
      //           <Button onClick={() => this.handleClick(store.id)}>X</Button>
      //         </TableCell>
      //       </TableRow>
      //     )}
      //   </TableBody>
      // </Table>
    );
  } // end render
} // end StoreList class

const mapStateToProps = state => ({
  store: state.store,
});

export default connect(mapStateToProps)(StoreList);