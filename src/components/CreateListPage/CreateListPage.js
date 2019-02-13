import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import CategoryList from './CategoryList';
import Typography from '@material-ui/core/Typography';
import CategoryForm from './CategoryForm';

class CreateListPage extends Component {

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_CATEGORY'});
    this.props.dispatch({type: 'FETCH_ITEMS_FOR_LIST'});
  }

  render() {
    return (
      <div>
          <Typography variant="h4">Create List</Typography>
          <CategoryForm status={true} title='New' category_name='' category_id = {0} />
          {this.props.category.map(cat => (
            <CategoryList key={cat.id} category={cat}/>
          ))}
      </div>
    )}
}

// Instead of taking everything from state, we just want the list info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  item: state.item,
  category: state.category,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CreateListPage);
// 