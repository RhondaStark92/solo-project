import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ReorderIcon from '@material-ui/icons/Reorder';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import StoreCategoryList from './StoreCategoryList';

class StoreCategoryOrder extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    console.log('in open dialog', this.props.store)
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      // <div>
        <Fragment>
        <IconButton onClick={this.handleClickOpen} 
              aria-label="Reorder">
              <ReorderIcon />
        </IconButton>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="dialog-reorder-store"
        >
          <DialogTitle id="dialog-reorder-store">Reorder Categories for {this.props.store.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <StoreCategoryList store_id={this.props.store.id}/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      {/* </div> */}
      </Fragment>
    );
  }
}

export default withMobileDialog()(StoreCategoryOrder);