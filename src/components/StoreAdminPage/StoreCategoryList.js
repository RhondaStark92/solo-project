import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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

    componentDidMount () {
        this.props.dispatch({type: 'FETCH_STORE_CATEGORY', payload: this.props.store_id});
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        let storeId = this.props.store_id;
        // call to saga to reorder the list in redux
        this.props.dispatch({ type: 'REORDER_LIST', payload: {oldIndex, newIndex}});
        // call to saga to update the list in the database
        this.props.dispatch({ type: 'UPDATE_CATEGORY_ORDER', payload: {oldIndex, newIndex, storeId}});
    };

    render() {
        return (
            <Fragment>
                <SortableList items={this.props.storeCategory} 
                                    onSortEnd={this.onSortEnd}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    storeCategory: state.storeCategory
});

export default connect(mapStateToProps)(StoreCategoryList);
