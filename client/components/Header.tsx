import Nav from './Nav'
import Link from 'next/link'
import styled from 'styled-components'

const StyledHeader = styled.header`
  background: ${(props) => props.theme.navy};

  .content {
    align-items: center;
    justify-content: space-between;
    display: flex;

    a {
      color: ${(props) => props.theme.white};
      font-size: 2rem;
    }

    p {
      color: ${(props) => props.theme.white};
    }
  }
`

const Header = () => (
  <StyledHeader>
    <div className="content">
      <h1>
        <Link href="/">
          <a>amazon</a>
        </Link>
      </h1>
      <p>Search</p>
      <p>Cart</p>
    </div>

    <Nav />
  </StyledHeader>
)

export default Header
