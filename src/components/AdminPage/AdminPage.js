import React, { Fragment } from 'react';
import styled from 'styled-components';
import StoreAdminPage from '../StoreAdminPage/StoreAdminPage';
import CategoryAdmin from '../CategoryAdmin/CategoryAdmin';
import ItemAdmin from '../ItemAdmin/ItemAdmin';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
`;

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
    // const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <Wrapper>
        <Title>Admin</Title>
        <ExpansionPanel key='store' expanded={expanded === 'store'} onChange={this.handleChange('store')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="title">Store</Typography>
            </ExpansionPanelSummary>
            <StoreAdminPage />
        </ExpansionPanel>
        <ExpansionPanel key='category'expanded={expanded === 'category'} onChange={this.handleChange('category')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="title">Category</Typography>
            </ExpansionPanelSummary>
            <CategoryAdmin />
        </ExpansionPanel>
        <ExpansionPanel key='item'expanded={expanded === 'item'} onChange={this.handleChange('item')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="title">Item</Typography>
            </ExpansionPanelSummary>
            <ItemAdmin />
        </ExpansionPanel>

        {/* <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab value="store" label="Store" />
          <Tab value="category" label="Category" />
          <Tab value="item" label="Item" />
        </Tabs>
        {this.state.value === 'store' && <TabContainer><StoreAdminPage/></TabContainer>}
        {this.state.value === 'category' && <TabContainer>Item Two</TabContainer>}
        {this.state.value === 'item' && <TabContainer>Item Three</TabContainer>} */}
      </Wrapper>
    );
  }
}

export default (AdminPage);