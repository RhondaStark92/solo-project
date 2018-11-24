import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  ExpansionPanelDetails: {
    padding: 0,
  }

});

class ItemForCategory extends Component {
  
  handleItemClick = item => () => {
    console.log('clicked on item to add to list', item);
    // this.props.dispatch({ type: 'FOUND_ITEM', payload: {item: item, store_id: this.props.store_id}})
  };

  render() {

    let itemOnList = true;
    console.log('quantity', this.props.itemForCat.quantity);
    
    if (this.props.itemForCat.quantity === null) {
      itemOnList = false;
    }
    
    return (
      <ListItem key={this.props.itemForCat.item_id} divider={true} dense={true}
          role={undefined} button onClick={this.handleItemClick(this.props.itemForCat.item_id)} >
          <Checkbox
              checked={itemOnList}
              tabIndex={-1}
              disableRipple
            />
        <Typography>
          <ListItemText>
              {this.props.itemForCat.item}
          </ListItemText>
        </Typography>
        <ListItemSecondaryAction>
          <div>
            {this.props.itemForCat.quantity}
            <Button>X</Button>
          </div>
        </ListItemSecondaryAction>
      </ListItem>
    )}
}

// Instead of taking everything from state, we just want the list info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  item: state.item,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(ItemForCategory));
// 