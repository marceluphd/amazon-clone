import Nav from './Nav'
import Link from 'next/link'
import styled from 'styled-components'

const StyledHeader = styled.header`
  background: ${(props) => props.theme.navy};
  font-size: 1.8rem;
`

const StyledHeaderContent = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;

  a {
    color: ${(props) => props.theme.white};
  }

  p {
    color: ${(props) => props.theme.white};
  }
`

const Header = () => (
  <StyledHeader>
    <StyledHeaderContent>
      <h1>
        <Link href="/">
          <a>amazon</a>
        </Link>
      </h1>
      <p>Search</p>
      <p>Cart</p>
    </StyledHeaderContent>

    <Nav />
  </StyledHeader>
)

export default Header
