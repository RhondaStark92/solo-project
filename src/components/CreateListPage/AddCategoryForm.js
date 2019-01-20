import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleButton from '@material-ui/icons/AddCircle';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

const emptyCategoryObject = {
  name: '',
  person_id: 0,
}

class AddCategoryForm extends Component {

  state = {
    open: false,
    newCategory: emptyCategoryObject
  };

  // update state from inputs
  handleChange = event => {
      // console.log('event happened', event, this.state);
      this.setState({
        ...this.state,
        newCategory: {
            ...this.state.newCategory,
            [event.target.name]: event.target.value,
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
  validCategoryData = () => {
    let check = this.state.newCategory;
    if (check.name === '') {
      alert('Please enter a category name.');
      return false;
    } else {
      return true;
    }
  };

  // add a new category only if valid name
  addNewCategory = event => {
      event.preventDefault();
      if (this.validCategoryData()) {
        this.props.dispatch({ type: 'ADD_CATEGORY', payload: this.state.newCategory });
        this.setState({
          open: false,
          newCategory: emptyCategoryObject
        });
      }
  }

  render() {
    return (
      <Grid item alignItems="center">
      {/* <Grid item alignItems="center"> */}
        <IconButton color="primary" onClick={this.handleClickOpen} 
          aria-label="Add">
          <AddCircleButton fontSize="large"/>
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Category</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              Enter the new category name.
            </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Category"
              value={this.state.newCategory.name}
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addNewCategory} color="primary">
              Add Category
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    ); // end return
  } // end render
} // end AdminForm class

const mapStateToProps = state => ({
  category: state.category,
});

export default connect(mapStateToProps) (withStyles(styles)(AddCategoryForm));