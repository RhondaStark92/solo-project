import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleButton from '@material-ui/icons/AddCircle';
import EditButton from '@material-ui/icons/Edit';
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

const emptyCategoryObject = {
  name: '',
  id: 0,
}

class AddCategoryForm extends Component {

  state = {
    open: false,
    newCategory: {
      name: '',
      id: 0,
    }
  }

  componentDidMount ()
  {
    this.setState({
      ...this.state,
      newCategory: {
        name: this.props.category_name,
        id: this.props.category_id,
      }
    });
  }

  // update state from inputs
  handleChange = event => {
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

  // update category name
  updateCategory = event => {
    event.preventDefault();
    console.log('in update category');
    if (this.validCategoryData()) {
      this.props.dispatch({ type: 'UPDATE_CATEGORY', payload: this.state.newCategory });
      this.setState({
        open: false,
        newCategory: emptyCategoryObject
      });
    }
}  

  render() {
    return (
      <div>
      {
        this.props.status ?
        (<Tooltip title="New Category" placement="right" aria-label="New Category">
          <IconButton color="primary" onClick={this.handleClickOpen} 
            aria-label="Add">
            <AddCircleButton fontSize="large"/>
          </IconButton>
        </Tooltip>)
        :
        (<Tooltip title="Update Category" placement="top" aria-label="Update Category">
        <IconButton color="primary" onClick={this.handleClickOpen} 
          aria-label="Update">
          <EditButton/>
        </IconButton>
      </Tooltip>)
      }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.title} Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              // label="Category"
              value={this.state.newCategory.name}
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
                (<Button onClick={this.addNewCategory} color="primary">
                  Add
                </Button>)
              : 
                (<Button onClick={this.updateCategory} color="primary">
                  Update
              </Button>)
            }
          </DialogActions>
        </Dialog>
      </div>
    ); // end return
  } // end render
} // end AdminForm class

const mapStateToProps = state => ({
  category: state.category,
});

export default connect(mapStateToProps) (withStyles(styles)(AddCategoryForm));