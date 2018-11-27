import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreCategoryList from './StoreCategoryList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { confirmAlert } from 'react-confirm-alert';
import '../../../node_modules/react-confirm-alert/src/react-confirm-alert.css'
// import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

const CategoryTitle = styled.p`
`;

class StoreAdminList extends Component {

  // state = {
  //   expanded: null,
  // };

  // handleChange = panel => (event, expanded) => {
  //   console.log('in change', expanded, panel)
  //   this.setState({
  //     expanded: expanded ? panel : false,
  //   });
  // };

  // mounting GET response to the DOM, when rendered
  componentDidMount() {
    this.getStores();
    console.log('in store admin list', this.props.store);
  };

  // get all projects
  getStores = () => {
    // this.props.dispatch({ type: 'FETCH_STORES' });
    this.props.dispatch({ type: 'FETCH_STORE_CATEGORY' });
  }

  handleItemClick = id => () => {
    console.log('select item for ordering', id);
  };

  // handle Delete click
  handleDeleteClick = id => () => {
    // confirm the deletion 
    console.log('in delete click', id)
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
  }; // end handleClick

  render() {

    // const { expanded } = this.state;
    // console.log ('expanded', expanded);

    const listForCat = this.props.storeCategory.filter(cat => cat.store_id === this.props.storeIn.id);
    console.log('on id', this.props.storeIn.id, this.props.expanded);
    
    return (

      <ExpansionPanel key={this.props.storeIn.id} expanded={this.props.expanded === `panel${this.props.storeIn.id}`} onChange={this.props.handleChange(`panel${this.props.storeIn.id}`)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <CategoryTitle>{this.props.storeIn.name}</CategoryTitle>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <List>
            {/* {listForCat.map(catForStore => ( */}
              {/* // <pre>{JSON.stringify(catForStore)}</pre> */}
              {/* <StoreCategoryList items={listForCat} store_id={this.props.storeIn.id}/> */}
              {/* // <ItemForCategory itemForCat={itemForCat} /> */}
            {/* ))} */}
        </List>
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
      <IconButton onClick={this.handleDeleteClick(this.props.storeIn.id)} 
               aria-label="Delete">
              <DeleteIcon />
            </IconButton>
        </ExpansionPanelActions>
        {/* <ItemListForCategory itemsForCategory={listForCat} /> */}
      </ExpansionPanel>
      // <List>
      // {this.props.store.map(store => (
      //     <ListItem key={store.id} divider={true} dense={false}
      //       button onClick={this.handleItemClick(store.id)} >
      //   <Typography>
      //     <ListItemText>
      //         {store.name} | {store.location}
      //     </ListItemText>
      //   </Typography>
      //   <ListItemSecondaryAction>
      //     {/* <div> */}
      //       <IconButton onClick={this.handleDeleteClick(store.id)} 
      //         aria-label="Delete">
      //         <DeleteIcon />
      //       </IconButton>

      //     {/* </div> */}
      //   </ListItemSecondaryAction>
      //  </ListItem>
      //   ))}
      // </List>
    );
  } // end render
} // end StoreList class

const mapStateToProps = state => ({
  storeCategory: state.storeCategory,
});

export default connect(mapStateToProps)(StoreAdminList);
// export default (StoreList);