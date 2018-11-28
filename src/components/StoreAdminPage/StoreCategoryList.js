import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
// import {arrayMove} from 'react-sortable-hoc';

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

    // categoryList = this.props.items;
    // state = {myState: this.props.items};
    

    componentDidMount () {
        // console.log('category list', this.state);
        // this.props.dispatch({type: 'CATEGORIES_FOR_STORE', payload: this.props.store_id})
    }

    // onSortEnd = ({oldIndex, newIndex}) => {    
    //     // console.log('in sort category list', oldIndex, newIndex, this.props.store_id);
    //     // let storeId = this.props.store_id;
    //     // this.props.dispatch({ type: 'REORDER_LIST', payload: {oldIndex, newIndex}})
    //     // this.props.dispatch({ type: 'UPDATE_CATEGORY_ORDER', payload: {oldIndex, newIndex, storeId}})
        
    //     // arrayMove(this.props.items, oldIndex, newIndex);
        
    //     // this.props.dispatch({ type: 'UPDATE_ORDER', payload: {oldIndex, newIndex}})
    //     // this.props.dispatch({ type: 'UPDATE_ORDER', payload: {oldIndex, newIndex}})
    // };

    saveOrder = () => {
        // this will call the saga for refreshing the database?
    }

    render() {
        // console.log('testing', this.props.storeCategory);
        // console.log('state after setting', this.state.myState);
        return (
            <div>
                <SortableList items={this.props.items} 
                                    onSortEnd={this.onSortEnd}/>
                <Button onClick={this.saveOrder}>Save Order</Button>
            </div>
        );
    }
}

// const mapStateToProps = state => ({
//     // storeCategory: state.storeCategory.filter(cat => cat.store_id === this.props.storeIn.id),
// });

export default (StoreCategoryList);
