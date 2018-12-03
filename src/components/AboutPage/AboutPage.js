import React, {Component} from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const Wrapper = styled.section`
  text-align: center;
`;

class AboutPage extends Component {

  render() {
    return (
      <Wrapper>
          <Typography variant="h4">Technologies Used</Typography>
          <List>
            <ListItem key='1' divider={true} dense={true}>
              <ListItemText>
                  JavaScript
              </ListItemText>
            </ListItem>
            <ListItem key='2' divider={true} dense={true}>
              <ListItemText>
                  React
              </ListItemText>
            </ListItem>
            <ListItem key='3' divider={true} dense={true}>
              <ListItemText>
                  Node
              </ListItemText>
            </ListItem>
            <ListItem key='4' divider={true} dense={true}>
              <ListItemText>
                  PostgreSQL
              </ListItemText>
            </ListItem>
            <ListItem key='5' divider={true} dense={true}>
              <ListItemText>
                  Material UI
              </ListItemText>
            </ListItem>
            <ListItem key='6' divider={true} dense={true}>
              <ListItemText>
                  React Sortable HOC
              </ListItemText>
            </ListItem>
          </List>
      </Wrapper>
    )}
}

// this allows us to use <App /> in index.js
export default (AboutPage);
