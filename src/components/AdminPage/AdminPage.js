import React, { Fragment } from 'react';
import styled from 'styled-components';
import StoreAdminPage from '../StoreAdminPage/StoreAdminPage';
// import CategoryAdmin from '../CategoryAdmin/CategoryAdmin';
// import ItemAdmin from '../ItemAdmin/ItemAdmin';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const Wrapper = styled.section`
  text-align: center;
`;

class AdminPage extends React.Component {
  // state = {
  //   expanded: 'store',
  // };

  // handleChange = panel => (event, expanded) => {
  //   this.setState({
  //     expanded: expanded ? panel : false,
  //   });
  // };
  
  render() {
    // const { expanded } = this.state;

    return (
      <Wrapper>
        <Typography variant="h4">Stores</Typography>
            <StoreAdminPage />
      </Wrapper>
    );
  }
}

export default (AdminPage);