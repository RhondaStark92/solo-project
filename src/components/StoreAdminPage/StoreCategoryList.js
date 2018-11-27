import React, { Component } from 'react';
import { connect } from 'react-redux';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
  <ListItem divider={true}>{value.name}</ListItem>
);

const SortableList = SortableContainer(({items}) => {
    return (
        <List>
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </List>
    );
  });
  
class StoreCategoryList extends Component {

    // state = this.props.items;
    
    onSortEnd = ({oldIndex, newIndex}) => {    
        console.log('in sort category list', oldIndex, newIndex, this.props.store_id);
        // let storeId = this.props.store_id;
        // this.props.dispatch({ type: 'REORDER_LIST', payload: {oldIndex, newIndex}})
        // this.props.dispatch({ type: 'UPDATE_CATEGORY_ORDER', payload: {oldIndex, newIndex, storeId}})
        // this.state = arrayMove(this.props.items, oldIndex, newIndex);
        // this.props.dispatch({ type: 'UPDATE_ORDER', payload: {oldIndex, newIndex}})
        // this.props.dispatch({ type: 'UPDATE_ORDER', payload: {oldIndex, newIndex}})
    };

    saveOrder = () => {
        // this will call the saga for refreshing the database?
    }

    render() {
        console.log('testing', this.props.items);
        
        return (
            <div>
                <SortableList items={this.state} 
                                    onSortEnd={this.onSortEnd}/>
                {/* <button onClick={this.saveOrder}>Save Order</button> */}
            </div>
        );
    }
}

// const mapStateToProps = state => ({
//   store: state.store,
// });

export default (StoreCategoryList);
