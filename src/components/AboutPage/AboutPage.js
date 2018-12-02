import React, {Component} from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  text-align: center;
`;

const Title = styled.h1`
  padding: 15px;
  text-transform: uppercase;
  text-align: center;`;

// const Selector = styled.div`
//   text-align: center;`

class AboutPage extends Component {

  render() {
    return (
      <Wrapper>
          <Title>Technologies Used</Title>
          <div></div>
              <p>React</p>
              <p>Node</p>
              <p>Javascript</p>
              <p>Postgresql</p>
              <p>Material UI</p>
              <p>ReactSortableHOC</p>
      </Wrapper>
    )}
}


// this allows us to use <App /> in index.js
export default (AboutPage);
