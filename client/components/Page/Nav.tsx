import Link from 'next/link'
import styled from 'styled-components'

const StyledNav = styled.div`
  display: flex;
  justify-content: center;

  a {
    color: ${(props) => props.theme.grey};
    padding: 0 1rem;
  }
`

const Nav = () => (
  <StyledNav>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
    <Link href="/account">
      {/* account will have signup, signin, and order info */}
      <a>Account</a>
    </Link>
  </StyledNav>
)

export default Nav
