import React, {Component} from 'react';
import {connect} from 'react-redux';
import ItemListForCategory from './ItemListForCategory';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import AddItemForm from './AddItemForm';
import { confirmAlert } from 'react-confirm-alert';
import '../../../node_modules/react-confirm-alert/src/react-confirm-alert.css'

class CategoryList extends Component {

  state = {
    expanded: null,
  }

  handleChange = panel => (event, expanded) => {
    console.log('in expansion', panel, expanded);
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  // handle Delete click
  handleDeleteClick = id => () => {
    // confirm the deletion 
    console.log('in delete click', id)
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure? This is permanent and will remove all items in the category.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => this.props.dispatch({ type: 'DELETE_CATEGORY', payload: id})
        },
        {
          label: 'Cancel',
          onClick: () => console.log('cancelled delete do nothing.')
        }
      ]
    })// end confirmAlert
  }; // end handleClick
  
  render() {
    const { expanded } = this.state;
    // Filter the items for the current category
    const listForCat = this.props.item.filter(cat => cat.category_id === this.props.category.id);
    
    return (
      <ExpansionPanel key={this.props.category.id} expanded={expanded === this.props.category.id}
        onChange={this.handleChange(this.props.category.id)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='body1'>{this.props.category.name}</Typography>
          </ExpansionPanelSummary>
          {
            (listForCat.length !== 0) ? 
            <ItemListForCategory itemsForCategory={listForCat} /> 
            : ''
          }
          <ExpansionPanelActions>
            <AddItemForm category_name={this.props.category.name} category_id = {this.props.category.id}/>
            <Tooltip title="Edit Category" placement="top" aria-label="Edit Category">
              <IconButton color="primary" aria-label="Edit Category">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Category" placement="top" aria-label="Delete Category">
              <IconButton onClick={this.handleDeleteClick(this.props.category.id)} color="primary" aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
        </ExpansionPanelActions>
      </ExpansionPanel>
    )}
}

// Instead of taking everything from state, we just want the item info.
const mapStateToProps = state => ({
  item: state.item,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CategoryList);
// 