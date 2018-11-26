import React, { Component } from 'react';
import { connect } from 'react-redux';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const SortableItem = SortableElement(({value}) =>
  <ListItem>{value.name}</ListItem>
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
  
//   class SortableComponent extends Component {
//     render() {
//     //   return <SortableList items={this.props.reduxState.plantList} onSortEnd={this.props.onSortEnd}/>;
//     return <SortableList items={this.props.reduxState.plantList}/>;
//     }
//   }

class StoreCategoryList extends Component {

    onSortEnd = ({oldIndex, newIndex}) => {    
        this.props.dispatch({ type: 'REORDER_LIST', payload: {oldIndex, newIndex}})
        this.props.dispatch({ type: 'UPDATE_ORDER', payload: {oldIndex, newIndex}})
    };

    saveOrder = () => {
        // this will call the saga for refreshing the database?
    }

    render() {
        return (
            <div>
                <h3>This is the plant list</h3>
                <SortableList items={this.props.items} 
                                    onSortEnd={this.onSortEnd}/>
                <button onClick={this.saveOrder}>Save Order</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  store: state.store,
});

export default connect(mapStateToProps)(StoreCategoryList);
