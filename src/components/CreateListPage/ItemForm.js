import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleButton from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
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
  id: 0,
  name: '',
  brand_name: '',
  category_id: 0,
  person_id: 0,
}

class ItemForm extends Component {

  state = {
    open: false,
    newItem: emptyListItem,
  };

  componentDidMount ()
  {
    this.setState({
      ...this.state,
      newItem: {
        id: this.props.item_id,
        name: this.props.item_name,
        brand_name: this.props.brand_name,
        category_id: this.props.category_id,
        person_id: 0,
      }
    });
  }

  // update state from inputs
  handleChange = event => {
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
        this.props.dispatch({ type: 'ADD_ITEM', payload: this.state.newItem });
        this.setState({
          open: false,
          newItem: emptyListItem
        });
      }
  }

  // update category name
  updateItem = event => {
    event.preventDefault();
    console.log('in update category');
    if (this.validItemData()) {
      this.props.dispatch({ type: 'UPDATE_ITEM', payload: this.state.newItem });
      this.setState({
        open: false,
        newItem: emptyListItem
      });
    }
  } 

  render() {
    return (
      <Fragment>
        {
        this.props.status ?
        (<Tooltip title="New Item" placement="top" aria-label="New Item">
          <IconButton color="primary" onClick={this.handleClickOpen} 
            aria-label="Add">
            <AddCircleButton/>
          </IconButton>
        </Tooltip>)
        :
        (<Tooltip title="Update Item" placement="top" aria-label="Update Item">
        <IconButton color="primary" onClick={this.handleClickOpen} 
          aria-label="Update">
          <EditIcon/>
        </IconButton>
      </Tooltip>)
      }

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          {
          this.props.status ? 
          (
            <DialogTitle id="form-dialog-title">New Item for {this.props.category_name}</DialogTitle>
          ) :
          (
            <DialogTitle id="form-dialog-title">Update Item</DialogTitle>
          ) 
          }
          {/* <DialogTitle id="form-dialog-title">New Item for {this.props.category_name}</DialogTitle> */}
          <DialogContent>
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
            {
              this.props.status ? 
                (<Button onClick={this.addNewItem} color="primary">
                  Add
                </Button>)
              : 
                (<Button onClick={this.updateItem} color="primary">
                  Update
              </Button>)
            }
            {/* <Button onClick={this.addNewItem} color="primary">
              Add Item
            </Button> */}
          </DialogActions>
        </Dialog>
      </Fragment>
    ); // end return
  } // end render
} // end AdminForm class

const mapStateToProps = state => ({
  item: state.item,
});

export default connect(mapStateToProps) (withStyles(styles)(ItemForm));