import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Wrapper = styled.section`
  // padding: 4em;
  margin-left: 25%;
  margin-right: 25%;
`;

const Title = styled.h1`
  padding: 15px;
  text-align: center;
`;

// const Selector = styled.div`
//   margin-left:15%;
//   margin-right:15%;
//   padding-bottom: 50px;
// `;

class CreateListPage extends Component {

  state = {id: 0};

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_CATEGORY'})
  }

  render() {
    return (
      <Wrapper>
        <Paper>
          <Title>Create Shopping List </Title>
          <div>
            {this.props.category.map(cat => (
              <ExpansionPanel>
                 <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                   <Typography>{cat.name}</Typography>
                 </ExpansionPanelSummary>
                 <ExpansionPanelDetails>
                   <Typography>
                     List of items will be here.
                   </Typography>
                 </ExpansionPanelDetails>
               </ExpansionPanel>
              // <ShoppingListItem key={cat.id} item={item} store_id={this.state.id} />
            ))}
          </div>
        </Paper>
      </Wrapper>
    )}
}

// Instead of taking everything from state, we just want the list info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  category: state.category,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CreateListPage);
// 