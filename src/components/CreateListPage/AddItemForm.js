import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleButton from '@material-ui/icons/AddCircle';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    contentAlign: 'center'
  },
  textField: {
    marginLeft: 100,
    marginRight: 10,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const emptyListItem = {
  name: '',
  brand_name: '',
  category_id: 0,
  person_id: 0,
}

class AddItemForm extends Component {
  // const { classes } = props;

  state = {
    open: false,
    newItem: emptyListItem,
  };

  // update state from inputs
  handleChange = event => {
      // console.log('event happened', event, this.state);
      this.setState({
        ...this.state,
        newItem: {
            ...this.state.newItem,
            [event.target.name]: event.target.value,
            category_id: this.props.category_id,
        }
      });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // verify that name has been filled out
  validItemData = () => {
    let check = this.state.newItem;
    if (check.name === '') {
      alert('Please enter an item name.');
      return false;
    } else {
      return true;
    }
  };

  // add a new category only if valid name
  addNewItem = event => {
      event.preventDefault();
      if (this.validItemData()) {
        // console.log('New Item: ', this.state.newItem);
        this.props.dispatch({ type: 'ADD_ITEM', payload: this.state.newItem });
        this.setState({
          open: false,
          newItem: emptyListItem
        });
      }
  }

  render() {
    return (
      <div>
      {/* <Grid item alignItems="center"> */}
        <Tooltip title="New Item" placement="top" aria-label="New Item">
          <IconButton color="primary" onClick={this.handleClickOpen} 
            aria-label="Add">
            <AddCircleButton/>
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Item for {this.props.category_name}</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              Enter the new item and brand name (if needed).
            </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              name="name"
              placeholder="Item Name"
              // label="Category"
              value={this.state.newItem.name}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              name="brand_name"
              // label="Category"
              placeholder="Brand Name"
              value={this.state.newItem.brand_name}
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addNewItem} color="primary">
              Add Item
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ); // end return
  } // end render
} // end AdminForm class

const mapStateToProps = state => ({
  item: state.item,
});

export default connect(mapStateToProps) (withStyles(styles)(AddItemForm));