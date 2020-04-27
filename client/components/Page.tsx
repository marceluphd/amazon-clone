import React, { FunctionComponent } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme } from '@utils/theme'

import Header from './Header'
import Meta from './Meta'

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    font-size: 10px;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
    line-height: 2;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${theme.black};
    text-decoration: none;
  }
`

const StyledPage = styled.div`
  background: white;
  color: ${(props) => props.theme.black};
`

const Inner = styled.div`
  background: ${(props) => props.theme.orange};
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  padding: 2rem;
`

const Page: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledPage>
        <Meta />
        <Header />
        <Inner>{children}</Inner>
      </StyledPage>
    </ThemeProvider>
  )
}

export default Page
