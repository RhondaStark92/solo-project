import React, { Fragment } from 'react';
import styled from 'styled-components';
import StoreAdminPage from '../StoreAdminPage/StoreAdminPage';
import CategoryAdmin from '../CategoryAdmin/CategoryAdmin';
import ItemAdmin from '../ItemAdmin/ItemAdmin';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const Wrapper = styled.section`
  text-align: center;
`;

class AdminPage extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  
  render() {
    const { expanded } = this.state;

    return (
      <Wrapper>
        <Typography variant="h4">Admin</Typography>
        <ExpansionPanel key='store' expanded={expanded === 'store'} onChange={this.handleChange('store')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Store</Typography>
            </ExpansionPanelSummary>
            <StoreAdminPage />
        </ExpansionPanel>
        <ExpansionPanel key='category'expanded={expanded === 'category'} onChange={this.handleChange('category')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Category</Typography>
            </ExpansionPanelSummary>
            <CategoryAdmin />
        </ExpansionPanel>
        <ExpansionPanel key='item'expanded={expanded === 'item'} onChange={this.handleChange('item')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Item</Typography>
            </ExpansionPanelSummary>
            <ItemAdmin />
        </ExpansionPanel>
      </Wrapper>
    );
  }
}

export default (AdminPage);