import React from 'react';
import styled, { createGlobalStyle } from 'styled-components'
import OrderBook from './components/OrderBook'
import MarketTick from './components/MarketTick'
import ControlFeed from './components/ControlFeed'

const App = (): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <AppBackground>
          <MarketTick />
          <OrderBook />
          <ControlFeed />
        </AppBackground>
      </Container>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const AppBackground = styled.div`
  background: #333b4d;
  padding-top: 4px;
  min-height: 789px;
`

const Container = styled.div`
  padding: 0.5rem 10rem;

`

export default App;
