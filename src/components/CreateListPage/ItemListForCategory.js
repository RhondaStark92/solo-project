import React, {Component} from 'react';
import ItemForCategory from './ItemForCategory';
import List from '@material-ui/core/List';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

class ItemListForCategory extends Component {

  render() {
    return (
      <ExpansionPanelDetails>
        <List>
            {this.props.itemsForCategory.map(itemForCat => (
              <ItemForCategory key={itemForCat.item_id} itemForCat={itemForCat} />
            ))}
        </List>
      </ExpansionPanelDetails>
    )}
}

export default (ItemListForCategory);