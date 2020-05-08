import Link from 'next/link'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { FETCH_CURRENT_USER_QUERY } from 'queries'

const StyledNav = styled.div`
  display: flex;
  justify-content: center;

  a {
    color: ${(props) => props.theme.grey};
    padding: 0 1rem;
  }
`

const Nav = () => {
  const { loading, error, data } = useQuery(FETCH_CURRENT_USER_QUERY)

  return (
    <StyledNav>
      <Link href="/">
        <a>Home</a>
      </Link>

      {data && data.me && (
        <>
          <Link href="/sell">
            <a>Sell</a>
          </Link>

          <Link href="/orders">
            <a>Orders</a>
          </Link>

          <Link href="/account">
            <a>Account</a>
          </Link>
        </>
      )}

      {!data ||
        (!data.me && (
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
        ))}
    </StyledNav>
  )
}

export default Nav
