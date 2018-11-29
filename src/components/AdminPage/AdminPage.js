import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import StoreAdminPage from '../StoreAdminPage/StoreAdminPage';
import CategoryAdmin from '../CategoryAdmin/CategoryAdmin';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const CategoryTitle = styled.h4`
`;

const Title = styled.h1`
  padding: 15px;
  text-align: center;
`;

const styles = {
  root: {
    flexGrow: 1,
  },
};

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
      <Fragment>
        <Title>Admin</Title>
        <ExpansionPanel key='store' expanded={expanded === 'store'} onChange={this.handleChange('store')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <CategoryTitle>Store Admin</CategoryTitle>
            </ExpansionPanelSummary>
            <StoreAdminPage />
        </ExpansionPanel>
        <ExpansionPanel key='category'expanded={expanded === 'category'} onChange={this.handleChange('category')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <CategoryTitle>Category Admin</CategoryTitle>
            </ExpansionPanelSummary>
            <CategoryAdmin />
        </ExpansionPanel>
        <ExpansionPanel key='item'expanded={expanded === 'item'} onChange={this.handleChange('item')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <CategoryTitle>Item Admin</CategoryTitle>
            </ExpansionPanelSummary>
            {/* <ItemListForCategory itemsForCategory={listForCat} /> */}
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
      </Fragment>
    );
  }
}

export default withStyles(styles)(AdminPage);